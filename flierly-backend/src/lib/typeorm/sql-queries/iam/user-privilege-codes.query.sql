WITH user_roles AS (
    SELECT role_id
    FROM iam_user_roles
    WHERE user_id = $1
),
role_privileges AS (
    SELECT DISTINCT rp.privilege_id
    FROM iam_role_privileges rp
    JOIN user_roles ur ON rp.role_id = ur.role_id
),
additional_privileges AS (
    SELECT privilege_id
    FROM iam_user_additional_privileges
    WHERE user_id = $1
),
restricted_privileges AS (
    SELECT privilege_id
    FROM iam_user_restricted_privileges
    WHERE user_id = $1
),
all_privileges AS (
    SELECT privilege_id
    FROM role_privileges
    UNION
    SELECT privilege_id
    FROM additional_privileges
)
SELECT p.code
FROM iam_privileges p
JOIN all_privileges ap ON p.id = ap.privilege_id
WHERE p.id NOT IN (SELECT privilege_id FROM restricted_privileges);
