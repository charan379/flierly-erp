import { createBooleanColumn, createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'

const createProductTableColumns = (translate: (value: string) => string): ProColumns<Product>[] => {
  return [
    // id
    createIdColumn(translate),
    // name
    createNameColumn(translate, { width: 200 }),
    // sku 
    {
      title: translate('sku'),
      dataIndex: 'sku',
      key: 'sku',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
    // hsn 
    {
      title: translate('hsn'),
      dataIndex: 'hsn',
      key: 'hsn',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
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
    // category
    {
      title: translate('subcategory'),
      dataIndex: "subCategory",
      key: 'subCategory',
      width: 150,
      ellipsis: true,
      render: (_text, entity) => {
        if (typeof entity.subCategory === 'number') return entity.subCategory;// if it's a number, it's a subCategory id
        if (typeof entity.subCategory === 'object' && entity.subCategory !== null && 'name' in entity.subCategory) {
          return entity.subCategory.name;
        }
        return null;
      },
    },
    // brand
    {
      title: translate('brand'),
      dataIndex: "brand",
      key: 'brand',
      width: 150,
      ellipsis: true,
      render: (_text, entity) => {
        if (typeof entity.brand === 'number') return entity.brand;// if it's a number, it's a brand id
        if (typeof entity.brand === 'object' && entity.brand !== null && 'name' in entity.brand) {
          return entity.brand.name;
        }
        return null;
      },
    },
    // description
    createDescriptionColumn(translate, { width: 250 }),
    // isActive
    createBooleanColumn(translate, { dataIndex: 'isActive', width: 80, }),
    createBooleanColumn(translate, { dataIndex: 'isComposite', width: 100, title: "is_composite" }),
    createBooleanColumn(translate, { dataIndex: 'isSerialized', width: 100, title: "is_serialized" }),
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

export default createProductTableColumns
