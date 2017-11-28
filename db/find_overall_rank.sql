with summary as (
    select
        c.cats_id,
        c.username,
        c.honor,
        ROW_NUMBER() OVER(ORDER BY c.honor desc) as position
    FROM cats c)
SELECT * FROM summary s WHERE s.cats_id =  $1