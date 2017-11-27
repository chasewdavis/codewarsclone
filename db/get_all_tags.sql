SELECT COUNT(tag_name), tag_name
FROM tags
GROUP BY tag_name
HAVING tag_name != ''
ORDER BY COUNT(tag_name) DESC