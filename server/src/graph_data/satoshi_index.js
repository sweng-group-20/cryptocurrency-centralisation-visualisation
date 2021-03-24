const db = require('../db');

/**
 * Calculates the minimum percentage of contributors making 51% of comments
 * @param {string} repoOwner Name of the repository owner
 * @param {string} repoName Name of the repository
 */
const calculateSatoshiIndex = async (repoOwner, repoName) => {
  const { rows: dateRows } = await db.query(
    `
    SELECT DISTINCT
      t.created_at::date
    FROM (
      SELECT
        c.created_at,
        r.repo_name,
        r.repo_owner
      FROM
        repositories r
        INNER JOIN issues_and_pull_requests ipr ON r.database_id = ipr.parent_repo_id
        INNER JOIN comments c ON ipr.database_id = c.parent_issue_id) t
    WHERE
      t.repo_name = $1
      AND t.repo_owner = $2
    ORDER BY
      t.created_at::date ASC;
    `,
    [repoName, repoOwner]
  );
  const dates = dateRows.map(({ created_at: createdAt }) => createdAt);

  const commentCounts = Object.assign(
    {},
    ...(await Promise.all(
      dates.map(async (date) => {
        const { rows } = await db.query(
          `
          SELECT
            t.author_login,
            count(t.author_login)::int AS comment_count
          FROM (
            SELECT
              r.repo_owner,
              r.repo_name,
              c.author_login,
              c.created_at::date
            FROM
              repositories r
              INNER JOIN issues_and_pull_requests ipr ON r.database_id = ipr.parent_repo_id
              INNER JOIN comments c ON ipr.database_id = c.parent_issue_id) t
          WHERE
            t.repo_name = $1
            AND t.repo_owner = $2
            AND t.created_at <= $3
          GROUP BY
            t.author_login
          ORDER BY
            comment_count DESC;
          `,
          [repoName, repoOwner, date]
        );

        const authorCommentCount = rows.map(
          ({ author_login: authorLogin, comment_count: commentCount }) => ({
            authorLogin,
            commentCount,
          })
        );

        const formattedDate = date.toISOString().split('T')[0];
        return { [formattedDate]: authorCommentCount };
      })
    ))
  );

  const satoshiIndexOverTime = Object.assign(
    {},
    ...Object.entries(commentCounts).map(([date, commentCount]) => {
      const totalCount = commentCount.reduce(
        (acc, curr) => acc + curr.commentCount,
        0
      );
      const totalAuthors = commentCount.length;
      let authorsProcessed = 0;
      let commentsProcessed = 0;

      for (
        let i = 0;
        i < totalAuthors && commentsProcessed / totalCount < 0.51;
        i += 1, authorsProcessed += 1
      ) {
        commentsProcessed += commentCount[i].commentCount;
      }

      const satoshiIndex = authorsProcessed / totalAuthors;

      return { [date]: satoshiIndex };
    })
  );

  return satoshiIndexOverTime;
};

module.exports = calculateSatoshiIndex;
