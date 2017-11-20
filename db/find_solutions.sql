SELECT fights_in_progress.user_solution, fights_in_progress.start_date, fights_in_progress.finish_date, cats.username
FROM fights_in_progress
JOIN cats ON cats.cats_id = fights_in_progress.cat_id
WHERE cat_fight_id = $1 AND completed = TRUE