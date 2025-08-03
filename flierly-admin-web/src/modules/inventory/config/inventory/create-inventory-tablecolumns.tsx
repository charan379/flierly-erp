import { createIdColumn, createNameColumn, createRemarksColumn, createTimeStampColumn } from "@/modules/core/utils/create-tablecolumn";
import { ProColumns } from "@ant-design/pro-components";

const createInventoryTableColumns = (t: (value: string) => string): ProColumns<Inventory>[] => {

    return [
        // id
        createIdColumn(t),
        // name
        createNameColumn(t, { width: 100 }),
        // inventory-type
        {
            title: t('inventory.inventory_type'),
            dataIndex: 'inventoryType',
            key: 'inventoryType',
            valueType: 'text',
            copyable: true,
            width: 180,
        },
        // branchId
        {
            title: t('inventory.branch_id'),
            dataIndex: 'branchId',
            key: 'branchId',
            valueType: 'text',
            copyable: true,
            width: 150,
        },
        // branchName
        {
            title: t('inventory.branch'),
            dataIndex: 'branch',
            key: 'branch',
            valueType: 'text',
            copyable: true,
            width: 180,
            render: (_text, record) => {
                if (typeof record.branch === 'object' && record.branch !== null && 'name' in record.branch) {
                    return record.branch.name;
                }
                return null;
            },
        },
        // remarks
        createRemarksColumn(t, { width: 250 }),
        // updatedAt
        createTimeStampColumn(t, { dataIndex: 'updatedAt', title: t('record.updated_at') }),
        // createdAt
        createTimeStampColumn(t, { dataIndex: 'createdAt', title: t('record.created_at') }),
        // deletedAt
        createTimeStampColumn(t, { dataIndex: 'deletedAt', title: t('record.deleted_at') }),
    ] satisfies ProColumns<Inventory>[]
};

export default createInventoryTableColumns;