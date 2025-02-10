import { createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'

const createProductCategoryTableColumns = (translate: (value: string) => string): ProColumns<ProductCategory>[] => {
  return [
    // id
    createIdColumn(translate),
    // name
    createNameColumn(translate, { width: 200 }),
    // description
    createDescriptionColumn(translate, { width: 250 }),
    // updatedAt
    createTimeStampColumn(translate, { dataIndex: 'updatedAt', title: translate('updated_at') }),
    // createdAt
    createTimeStampColumn(translate, { dataIndex: 'createdAt', title: translate('created_at') }),
    // deletedAt
    createTimeStampColumn(translate, { dataIndex: 'deletedAt', title: translate('deleted_at') }),
  ]
}

export default createProductCategoryTableColumns;
