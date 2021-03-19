CREATE DATABASE db;

\c db;
CREATE TABLE respositories (
  database_id bigint UNIQUE NOT NULL,
  repo_owner varchar(39) NOT NULL,
  repo_name varchar(100) NOT NULL,
  PRIMARY KEY (database_id)
);

CREATE TABLE issues_and_pull_requests (
  database_id bigint UNIQUE NOT NULL,
  author_login varchar(39),
  issue_type varchar(5),
  parent_repo bigint,
  PRIMARY KEY (database_id),
  CONSTRAINT check_issue_type CHECK (issue_type IN ('pr', 'issue')),
  CONSTRAINT fk_repository FOREIGN KEY (parent_repo) REFERENCES respositories (database_id)
);

CREATE TABLE comments (
  database_id bigint UNIQUE NOT NULL,
  created_at timestamp NOT NULL,
  author_login varchar(39),
  parent_issue bigint,
  PRIMARY KEY (database_id),
  CONSTRAINT fk_parent_issue FOREIGN KEY (parent_issue) REFERENCES issues_and_pull_requests (database_id)
);

