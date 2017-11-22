insert into fights_in_progress(cat_id, completed, user_solution, cat_fight_id)
values($1, $2, $3, $4);
select * from fights_in_progress
where cat_id = $1 and cat_fight_id = $4