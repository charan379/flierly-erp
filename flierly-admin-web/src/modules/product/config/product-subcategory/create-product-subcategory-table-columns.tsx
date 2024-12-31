import { createBooleanColumn, createCodeColumn, createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'

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
        if (typeof entity.category === 'number') return entity.category;// if it's a number, it's a category id
        if (typeof entity.category === 'object' && entity.category !== null && 'name' in entity.category) {
          return entity.category.name;
        }
        return null;
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
