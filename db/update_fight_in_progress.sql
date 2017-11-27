update fights_in_progress
set user_solution = $3
where cat_id = $1 AND cat_fight_id = $4 AND completed = FALSE;
select * from cats where cats_id = $1