CREATE DATABASE db;

\c db;
CREATE TABLE repositories (
  database_id bigint UNIQUE NOT NULL,
  repo_owner varchar(39) NOT NULL,
  repo_name varchar(100) NOT NULL,
  pull_request_cursor varchar(60),
  issue_cursor varchar(60),
  PRIMARY KEY (database_id)
);

CREATE TABLE issues_and_pull_requests (
  database_id bigint UNIQUE NOT NULL,
  issue_type varchar(5),
  parent_repo_id bigint,
  issue_number int,
  issue_state varchar(6),
  PRIMARY KEY (database_id),
  CONSTRAINT check_issue_type CHECK (issue_type IN ('PR', 'ISSUE')),
  CONSTRAINT check_issue_state CHECK (issue_state IN ('OPEN', 'CLOSED', 'MERGED')),
  CONSTRAINT fk_repository FOREIGN KEY (parent_repo_id) REFERENCES repositories (database_id) ON DELETE CASCADE
);

CREATE TABLE comments (
  database_id bigint UNIQUE NOT NULL,
  created_at timestamp NOT NULL,
  author_login varchar(39),
  parent_issue_id bigint,
  PRIMARY KEY (database_id),
  CONSTRAINT fk_parent_issue FOREIGN KEY (parent_issue_id) REFERENCES issues_and_pull_requests (database_id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION calculate_satoshi_index (repo_owner varchar(39), repo_name varchar(100), date_end date DEFAULT CURRENT_DATE)
  RETURNS double precision
  LANGUAGE plpgsql
  AS $$
DECLARE
  satoshi_index double precision;
  total_authors int;
  total_comments int;
  comments_processed int := 0;
  authors_processed int := 0;
  author record;
BEGIN
  TRUNCATE TABLE comment_counts;
  INSERT INTO comment_counts
  SELECT
    t.author_login,
    count(t.author_login)::int AS comment_count
  FROM (
    SELECT
      r.repo_owner AS ro,
      r.repo_name AS rn,
      c.author_login,
      c.created_at::date
    FROM
      repositories r
      INNER JOIN issues_and_pull_requests ipr ON r.database_id = ipr.parent_repo_id
      INNER JOIN comments c ON ipr.database_id = c.parent_issue_id) t
WHERE
  t.ro = repo_owner
    AND t.rn = repo_name
    AND t.created_at <= date_end
  GROUP BY
    t.author_login
  ORDER BY
    comment_count DESC;
  SELECT
    count(*) INTO total_authors
  FROM
    comment_counts;
  SELECT
    sum(comment_count) INTO total_comments
  FROM
    comment_counts;
  FOR author IN (
    SELECT
      comment_count
    FROM
      comment_counts)
    LOOP
      comments_processed := comments_processed + author.comment_count;
      authors_processed := authors_processed + 1;
      IF comments_processed::double precision / total_comments > 0.51 THEN
        satoshi_index := authors_processed::double precision / total_authors;
        EXIT;
      END IF;
    END LOOP;
  RETURN satoshi_index;
END;
$$;

CREATE OR REPLACE FUNCTION create_satoshi_index_view (repo_owner varchar(39), repo_name varchar(100))
  RETURNS VOID
  LANGUAGE plpgsql
  AS $$
DECLARE
  snake_case_repo_owner varchar(39);
  snake_case_repo_name varchar(100);
  view_name varchar(154);
BEGIN
  snake_case_repo_owner := REPLACE(repo_owner, '-', '_');
  snake_case_repo_name := REPLACE(repo_name, '-', '_');
  view_name := format('%I_%I_satoshi_index', snake_case_repo_owner, snake_case_repo_name);
  EXECUTE format('CREATE MATERIALIZED VIEW %I AS (
    SELECT
      t2.index_date,
      calculate_satoshi_index (%L, %L, t2.index_date) AS satoshi_index
    FROM (
      SELECT
        date_trunc(''day'', dd)::date AS index_date
      FROM
        generate_series((
          SELECT
            t.created_at::date FROM (
              SELECT
                c.created_at, r.repo_name AS rn, r.repo_owner AS ro FROM repositories r
                INNER JOIN issues_and_pull_requests ipr ON r.database_id = ipr.parent_repo_id
                INNER JOIN comments c ON ipr.database_id = c.parent_issue_id) t
            WHERE
              t.ro = %L
              AND t.rn = %L ORDER BY t.created_at::date ASC LIMIT 1)::timestamp, now()::timestamp, ''1 week''::interval) dd) t2)', view_name, repo_owner, repo_name, repo_owner, repo_name);
  EXECUTE format('CREATE UNIQUE INDEX %I_index_date_idx ON %I(index_date)', view_name, view_name);
END;
$$;

SELECT
  create_satoshi_index_view ('bitcoin', 'bitcoin');

SELECT
  create_satoshi_index_view ('ethereum', 'go-ethereum');

