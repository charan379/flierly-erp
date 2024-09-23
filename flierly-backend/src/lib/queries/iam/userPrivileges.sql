WITH user_roles AS (
    SELECT role_id
    FROM iam_user_roles
    WHERE user_id = $1
),
role_privileges AS (
    SELECT rp.privilege_id
    FROM iam_role_privileges rp
    JOIN user_roles ur ON rp.role_id = ur.role_id
),
additional_privileges AS (
    SELECT privilege_id
    FROM iam_user_additional_privileges
    WHERE user_id = $1
),
all_privileges AS (
    SELECT privilege_id
    FROM role_privileges
    UNION
    SELECT privilege_id
    FROM additional_privileges
)
SELECT p.*
FROM iam_privileges p
JOIN all_privileges ap ON p.id = ap.privilege_id
WHERE NOT EXISTS (
    SELECT 1
    FROM iam_user_restricted_privileges rp
    WHERE rp.privilege_id = p.id AND rp.user_id = $1
);