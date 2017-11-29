update cats
set clan = $1
where cats_id = $2;
select * from cats where cats_id = $2