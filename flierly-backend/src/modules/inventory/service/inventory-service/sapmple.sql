SELECT i.branch_id, i.inventory_type,ps.product_id, count(DISTINCT i.id), 
COALESCE(SUM(ps.balance),0) as stock_balance
FROM dev.inventories i LEFT JOIN dev.product_stocks ps
ON ps.inventory_id = i.id
WHERE i.branch_id = 2
GROUP BY i.inventory_type, i.branch_id,ps.product_id