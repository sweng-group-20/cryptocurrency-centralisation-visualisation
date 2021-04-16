const pLimit = require('p-limit');
const logger = require('../logger');

const db = require('../db');
const gitHubHttpClient = require('../http_clients/github');

/**
 * Syncs local database repository issues or pull requests with GitHub
 * @param {'pullRequests' | 'issues'} type Type to sync
 * @param {string} repoOwner Name of the repository owner
 * @param {string} repoName Name of the repository
 * @param {number} pullRequestLimit Limit of the number issues or pull requests to retrieve
 * @param {string} startCursor
 */
const syncDatabaseRepositoryIssuesOrPullRequests = async (
  type,
  repoOwner,
  repoName,
  startCursor
) => {
  logger.debug(
    { params: { type, repoOwner, repoName, startCursor } },
    `[syncDatabaseRepositoryIssuesOrPullRequests]`
  );

  const rateLimitResp = await gitHubHttpClient.getRateLimit();
  const { remaining } = rateLimitResp.rateLimit;
  const threshold = 400;
  if (remaining <= threshold) {
    return;
  }
  const limit = threshold;

  const getIssueOrPullRequestNumbersResponse = await gitHubHttpClient.getIssueOrPullRequestNumbers(
    type,
    repoOwner,
    repoName,
    limit,
    startCursor
  );

  const updatedCursor =
    getIssueOrPullRequestNumbersResponse.repository.endCursor;

  const limitPromise = pLimit(5);

  const getIssueOrPullRequestCommentsResponse = await Promise.all(
    getIssueOrPullRequestNumbersResponse.repository[type].nodes.map(
      ({ number }) =>
        limitPromise(() => {
          if (type === 'pullRequests') {
            return gitHubHttpClient.getPullRequestComments(
              repoOwner,
              repoName,
              number
            );
          }
          return gitHubHttpClient.getIssueComments(repoOwner, repoName, number);
        })
    )
  );

  const repository = getIssueOrPullRequestCommentsResponse.reduce(
    (acc, response) => {
      const { repository: currentRepository } = response;
      acc.databaseId = currentRepository.databaseId;
      const typeSingular = type.slice(0, -1);
      acc.issuesOrPullRequests.push(currentRepository[typeSingular]);

      return acc;
    },
    { databaseId: 0, issuesOrPullRequests: [] }
  );

  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    if (updatedCursor != null) {
      const cursor = `${
        type === 'pullRequests' ? 'pull_request' : 'issue'
      }_cursor`;
      await client.query(
        `
        INSERT INTO repositories (database_id, repo_name, repo_owner, ${cursor})
          VALUES ($1, $2, $3, $4)
        ON CONFLICT (database_id)
          DO UPDATE SET
            ${cursor} = $4;
        `,
        [repository.databaseId, repoName, repoOwner, updatedCursor]
      );
    }

    await Promise.all(
      repository.issuesOrPullRequests.map(async (issueOrPullRequest) => {
        await client.query(
          `
          INSERT INTO issues_and_pull_requests (database_id, issue_type, parent_repo_id, issue_number, issue_state)
            VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT
            DO NOTHING;
          `,
          [
            issueOrPullRequest.databaseId,
            type === 'pullRequests' ? 'PR' : 'ISSUE',
            repository.databaseId,
            issueOrPullRequest.number,
            issueOrPullRequest.state,
          ]
        );

        return Promise.all(
          issueOrPullRequest.comments.nodes.map((comment) =>
            client.query(
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
                issueOrPullRequest.databaseId,
              ]
            )
          )
        );
      })
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

/**
 * Syncs the local database with GitHub
 * @param {string} repoOwner Name of the repository owner
 * @param {string} repoName Name of the repository
 */
const syncDatabase = async (repoOwner, repoName) => {
  logger.debug({ params: { repoOwner, repoName } }, `[syncDatabase]`);

  const { rows } = await db.query(
    `
    SELECT
      issue_cursor, pull_request_cursor
    FROM
      repositories
    WHERE
      repo_owner = $1 AND repo_name = $2;
    `,
    [repoOwner, repoName]
  );

  let issueCursor = null;
  let pullRequestCursor = null;
  if (rows.length > 0) {
    issueCursor = rows[0].issue_cursor;
    pullRequestCursor = rows[0].pull_request_cursor;
  }

  await syncDatabaseRepositoryIssuesOrPullRequests(
    'issues',
    repoOwner,
    repoName,
    issueCursor
  );

  return syncDatabaseRepositoryIssuesOrPullRequests(
    'pullRequests',
    repoOwner,
    repoName,
    pullRequestCursor
  );
};

module.exports = { syncDatabase };
