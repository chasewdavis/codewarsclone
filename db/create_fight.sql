INSERT INTO cat_fights (
    author_id, name, description, difficulty, solution, function_name, created_at, placeholder
    )
VALUES(
    $1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, $7
)
RETURNING *