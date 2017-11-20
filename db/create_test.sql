INSERT INTO tests (fight_id, parameters, parameter_types, expected_result, expected_result_type, hidden)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *