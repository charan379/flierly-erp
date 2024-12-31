import { createBooleanColumn, createCodeColumn, createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

const createProductSubCategoryTableColumns = (translate: (value: string) => string): ProColumns<ProductSubCategory>[] => {
  return [
    // id
    createIdColumn(translate),
    // name
    createNameColumn(translate, { width: 200 }),
    // category
    {
      title: translate('category'),
      dataIndex: "category",
      key: 'category',
      width: 150,
      ellipsis: true,
      render: (_text, entity) => {
        return entity?.category?.name ? entity.category?.name : <Tag color="green">null</Tag>
      },
    },
    // code
    createCodeColumn(translate, { width: 120 }),
    // description
    createDescriptionColumn(translate, { width: 250 }),
    // isActive
    createBooleanColumn(translate, { dataIndex: 'isActive', }),
    // updatedAt
    createTimeStampColumn(translate,
      {
        dataIndex: 'updatedAt',
        title: translate('updated_at')
      }
    ),
    // createdAt
    createTimeStampColumn(translate,
      {
        dataIndex: 'createdAt',
        title: translate('created_at')
      }
    ),
    // deletedAt
    createTimeStampColumn(translate,
      {
        dataIndex: 'deletedAt',
        title: translate('deleted_at')
      }
    ),
  ]
}

export default createProductSubCategoryTableColumns
