select count(distinct user_solution) from fights_in_progress
where cat_id = $1 and completed = true;