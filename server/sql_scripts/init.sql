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

