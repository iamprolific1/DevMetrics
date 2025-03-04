--USERS TABLE
CREATE TABLE developers (
    id SERIAL PRIMARY KEY,
    github_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    avatar_url TEXT,
    access_token TEXT NOT NULL
);

--COMMITS TABLE
CREATE TABLE commits (
    id SERIAL PRIMARY KEY,
    developer_id INT REFERENCES developers(id),
    repo TEXT NOT NULL,
    commit_count INT NOT NULL,
    additions INT DEFAULT 0,
    deletions INT DEFAULT 0,
    timestamp TIMESTAMP DEFAULT NOW()
);

--PULL REQUESTS TABLE
CREATE TABLE pull_requests(
    id SERIAL PRIMARY KEY,
    developer_id INT REFERENCES developers(id),
    repo TEXT NOT NULL,
    pr_count INT NOT NULL,
    merged BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT NOW()
);

--ISSUES TABLE
CREATE TABLE issues(
    id SERIAL PRIMARY KEY,
    developer_id INT REFERENCES developers(id),
    repo TEXT NOT NULL,
    issue_count INT NOT NULL,
    status TEXT CHECK(status IN('open', 'closed')),
    timestamp TIMESTAMP DEFAULT NOW()
);

--CODE QUALITY TABLE
CREATE TABLE code_quality(
    id SERIAL PRIMARY KEY,
    developer_id INT REFERENCES developers(id),
    repo TEXT NOT NULL,
    lint_errors INT DEFAULT 0,
    maintainability_score FLOAT,
    timestamp TIMESTAMP DEFAULT NOW()
);