DELETE FROM tags
WHERE cat_fight_id = $1;

DELETE FROM tests
WHERE fight_id = $1;

DELETE FROM cat_fights
WHERE cat_fight_id = $1;