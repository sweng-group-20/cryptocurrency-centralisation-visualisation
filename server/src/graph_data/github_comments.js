const db = require('../db');
const githubHttpClient = require('../http_clients/github');

/**
 * Syncs the local database with GitHub
 * @param {string} repoOwner Name of the repository owner
 * @param {string} repoName Name of the repository
 * @param {number} iterationLimit Limit of iterations during pagenation
 */
const syncDatabase = async (repoOwner, repoName, iterationLimit) => {
  const { rows } = await db.query(
    `
    SELECT
      pull_request_cursor,
      issue_cursor
    FROM
      repositories
    WHERE
      repo_owner = $1 AND repo_name = $2;
    `,
    [repoOwner, repoName]
  );

  let pullRequestCursor = null;
  // let issueCursor = null;
  if (rows.length > 0) {
    pullRequestCursor = rows[0].pull_request_cursor;
    // issueCursor = rows[0].issue_cursor;
  }

  const {
    repository: pullRequestNumbersRepository,
  } = await githubHttpClient.getPullRequestNumbers(
    repoOwner,
    repoName,
    iterationLimit,
    pullRequestCursor
  );

  const updatedPullRequestCursor = pullRequestNumbersRepository.endCursor;
  const updatedIssueCursor = null;

  const getPullRequestCommentsResponses = await Promise.all(
    pullRequestNumbersRepository.pullRequests.nodes.map(
      ({ number: pullRequestNumber }) =>
        githubHttpClient.getPullRequestComments(
          repoOwner,
          repoName,
          pullRequestNumber
        )
    )
  );

  const repository = getPullRequestCommentsResponses.reduce(
    (acc, response) => {
      const { databaseId, pullRequest } = response.repository;
      acc.databaseId = databaseId;
      acc.pullRequests.push(pullRequest);

      return acc;
    },
    { databaseId: 0, pullRequests: [] }
  );

  await db.query(
    `
    INSERT INTO repositories (database_id, repo_name, repo_owner, pull_request_cursor, issue_cursor)
      VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (database_id)
      DO UPDATE SET
        pull_request_cursor = $4, issue_cursor = $5;
    `,
    [
      repository.databaseId,
      repoName,
      repoOwner,
      updatedPullRequestCursor,
      updatedIssueCursor,
    ]
  );

  Promise.all(
    repository.pullRequests.map(async (pullRequest) => {
      await db.query(
        `
        INSERT INTO issues_and_pull_requests (database_id, issue_type, parent_repo_id, issue_number, issue_state)
          VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT
          DO NOTHING;
        `,
        [
          pullRequest.databaseId,
          'PR',
          repository.databaseId,
          pullRequest.number,
          pullRequest.state,
        ]
      );
      return pullRequest.comments.nodes.map((comment) =>
        db.query(
          `
          INSERT INTO comments (database_id, created_at, author_login, parent_issue_id)
            VALUES ($1, $2, $3, $4)
          ON CONFLICT
            DO NOTHING;
          `,
          [
            comment.databaseId,
            comment.createdAt,
            comment.author?.login,
            pullRequest.databaseId,
          ]
        )
      );
    })
  );
};

module.exports = { syncDatabase };
