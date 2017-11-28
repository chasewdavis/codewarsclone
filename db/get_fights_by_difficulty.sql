SELECT cat_fights.cat_fight_id, cat_fights.name, cat_fights.difficulty, cats.username, ARRAY_AGG(tags.tag_name) AS tags 
FROM cat_fights
JOIN cats on cats.cats_id = cat_fights.author_id
JOIN tags on cat_fights.cat_fight_id = tags.cat_fight_id
WHERE cat_fights.difficulty = $1 
GROUP BY cat_fights.cat_fight_id, cats.username