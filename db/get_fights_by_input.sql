SELECT * FROM cat_fights
WHERE name ILIKE '%' || $1 || '%'