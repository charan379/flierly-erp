import { createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'

const createProductSubCategoryTableColumns = (translate: (value: string) => string): ProColumns<ProductSubCategory>[] => {
  return [
    // id
    createIdColumn(translate),
    // name
    createNameColumn(translate, { width: 200 }),
    // categoryId
    {
      title: translate('category_id'),
      dataIndex: "categoryId",
      key: 'categoryId',
      width: 80,
    },
    // category
    {
      title: translate('category'),
      dataIndex: "category",
      key: 'category',
      width: 150,
      ellipsis: true,
      render: (_text, record) => {
        if (typeof record.category === 'object' && record.category !== null && 'name' in record.category) {
          return record.category.name;
        }
        return null;
      },
    },
    // description
    createDescriptionColumn(translate, { width: 250 }),
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
