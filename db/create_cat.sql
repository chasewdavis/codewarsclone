INSERT INTO cats (username, email, image_url, auth_id, created_at, last_seen_at)
VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)