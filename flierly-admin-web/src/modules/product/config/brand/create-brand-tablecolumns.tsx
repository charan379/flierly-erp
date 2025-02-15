import { createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'

const createBrandTableColumns = (t: (value: string) => string): ProColumns<Brand>[] => {
  return [
    // id
    createIdColumn(t),
    // name
    createNameColumn(t, { width: 100 }),
    // description
    createDescriptionColumn(t, { width: 180 }),
    // updatedAt
    createTimeStampColumn(t, { dataIndex: 'updatedAt', title: t('record.updated_at') }),
    // createdAt
    createTimeStampColumn(t, { dataIndex: 'createdAt', title: t('record.created_at') }),
    // deletedAt
    createTimeStampColumn(t, { dataIndex: 'deletedAt', title: t('record.deleted_at') }),
  ]
}

export default createBrandTableColumns
