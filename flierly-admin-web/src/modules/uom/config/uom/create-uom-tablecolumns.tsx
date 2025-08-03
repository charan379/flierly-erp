import { createIdColumn, createNameColumn, createTimeStampColumn } from "@/modules/core/utils/create-tablecolumn";
import { ProColumns } from "@ant-design/pro-components";

const createUomTableColumns = (t: (value: string) => string): ProColumns<UOM>[] => {

    return [
        // id
        createIdColumn(t),
        // name
        createNameColumn(t, { width: 100 }),
        // shortName
        {
            title: t('uom.short_name'),
            dataIndex: 'shortName',
            key: 'shortName',
            valueType: 'text',
            copyable: true,
            width: 120,
        },
        // updatedAt
        createTimeStampColumn(t, { dataIndex: 'updatedAt', title: t('record.updated_at') }),
        // createdAt
        createTimeStampColumn(t, { dataIndex: 'createdAt', title: t('record.created_at') }),
        // deletedAt
        createTimeStampColumn(t, { dataIndex: 'deletedAt', title: t('record.deleted_at') }),
    ]
};

export default createUomTableColumns;