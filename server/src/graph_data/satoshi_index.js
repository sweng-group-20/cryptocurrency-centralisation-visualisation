const db = require('../db');

/**
 * Returns the view name given the repo owner and repo name
 * @param {string} repoOwner Name of the repository owner
 * @param {string} repoName Name of the repository
 */
const getSatoshiIndexTableName = (repoOwner, repoName) => {
  const snakeCaseRepoOwner = repoOwner.replace('-', '_');
  const snakeCaseRepoName = repoName.replace('-', '_');
  return `${snakeCaseRepoOwner}_${snakeCaseRepoName}_satoshi_index`;
};

/**
 * Updates the satoshi index view with the newly inserted values
 * @param {string} repoOwner Name of the repository owner
 * @param {string} repoName Name of the repository
 */
const refreshSatoshiIndex = async (repoOwner, repoName) => {
  const tableName = getSatoshiIndexTableName(repoOwner, repoName);
  const { rows } = await db.query(
    `SELECT relispopulated FROM pg_class WHERE relname = '${tableName}'`
  );
  const concurrently = rows[0].relispopulated ? 'CONCURRENTLY' : '';
  await db.query(`REFRESH MATERIALIZED VIEW ${concurrently} ${tableName}`, []);
};
/**
 * Returns the satoshi index of the given repo owner and repo name
 * @param {string} repoOwner Name of the repository owner
 * @param {string} repoName Name of the repository
 */
const getSatoshiIndex = async (repoOwner, repoName) => {
  const tableName = getSatoshiIndexTableName(repoOwner, repoName);
  const { rows } = await db.query(
    `
    SELECT
      index_date,
      satoshi_index
    FROM
      ${tableName}
    ORDER BY
      index_date;
    `,
    []
  );

  const satoshiIndexOverTime = Object.assign(
    {},
    ...rows.map(({ index_date: date, satoshi_index: index }) => {
      const formattedDate = date.toISOString().split('T')[0];

      return { [formattedDate]: index };
    })
  );

  return satoshiIndexOverTime;
};

module.exports = {
  getSatoshiIndex,
  refreshSatoshiIndex,
};
