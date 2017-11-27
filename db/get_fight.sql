SELECT *
FROM cat_fights
JOIN cats ON cats.cats_id = cat_fights.author_id
WHERE cat_fight_id = $1