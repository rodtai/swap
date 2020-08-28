CREATE TABLE usergroup (
    user_id text,
    group_id UUID,
    group_idx int,
    PRIMARY KEY(user_id, group_idx, group_id)
)

WITH CLUSTERING ORDER BY (group_idx ASC)