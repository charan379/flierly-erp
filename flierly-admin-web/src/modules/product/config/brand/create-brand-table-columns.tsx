import { createBooleanColumn, createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/utils/create-table-column'
import { ProColumns } from '@ant-design/pro-components'

const createBrandTableColumns = (translate: (value: string) => string): ProColumns<Brand>[] => {
  return [
    // id
    createIdColumn(translate),
    // name
    createNameColumn(translate, { width: 100 }),
    // description
    createDescriptionColumn(translate, { width: 180 }),
    // isActive
    createBooleanColumn(translate, { dataIndex: 'isActive', }),
    // updatedAt
    createTimeStampColumn(translate, { dataIndex: 'updatedAt', title: translate('updated_at') }),
    // createdAt
    createTimeStampColumn(translate, { dataIndex: 'createdAt', title: translate('created_at') }),
    // deletedAt
    createTimeStampColumn(translate, { dataIndex: 'deletedAt', title: translate('deleted_at') }),
  ]
}

export default createBrandTableColumns
