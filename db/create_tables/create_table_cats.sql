CREATE TABLE cats (
    cats_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(200),
    image_url TEXT,
    created_at TIMESTAMP,
    last_seen_at TIMESTAMP,
    last_kata_id INTEGER,
    auth_id TEXT
)