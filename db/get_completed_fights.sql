select count(distinct cat_fight_id) from fights_in_progress
where cat_id = $1 and completed = true;