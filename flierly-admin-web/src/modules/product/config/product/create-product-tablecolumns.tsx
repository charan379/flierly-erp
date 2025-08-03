import { createBooleanColumn, createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'

const createProductTableColumns = (t: (value: string) => string): ProColumns<Product>[] => {
  return [
    // id
    createIdColumn(t),
    // name
    createNameColumn(t, { width: 200 }),
    // product-type
    {
      title: t('product.type'),
      dataIndex: 'type',
      key: 'type',
      valueType: 'text',
      copyable: true,
      width: 180,
    },
    // sku 
    {
      title: t('product.sku'),
      dataIndex: 'sku',
      key: 'sku',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
    // hsn 
    {
      title: t('product.hsn'),
      dataIndex: 'hsn',
      key: 'hsn',
      valueType: 'text',
      copyable: true,
      width: 120,
    },
    // category
    {
      title: t('product.category'),
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
    // category
    {
      title: t('product.subcategory'),
      dataIndex: "subCategory",
      key: 'subCategory',
      width: 150,
      ellipsis: true,
      render: (_text, record) => {
        if (typeof record.subCategory === 'object' && record.subCategory !== null && 'name' in record.subCategory) {
          return record.subCategory.name;
        }
        return null;
      },
    },
    // brand
    {
      title: t('product.brand'),
      dataIndex: "brand",
      key: 'brand',
      width: 150,
      ellipsis: true,
      render: (_text, record) => {
        if (typeof record.brand === 'object' && record.brand !== null && 'name' in record.brand) {
          return record.brand.name;
        }
        return null;
      },
    },
    // baseUom
    {
      title: t('product.base_uom'),
      dataIndex: "baseUOM",
      key: 'baseUOM',
      width: 150,
      ellipsis: true,
      render: (_text, record) => {
        if (typeof record.baseUOM === 'object' && record.baseUOM !== null && 'name' in record.baseUOM) {
          return record.baseUOM.name;
        }
        return null;
      },
    },
    // description
    createDescriptionColumn(t, { width: 250 }),
    // isActive
    createBooleanColumn(t, { dataIndex: 'isActive', width: 110, }),
    createBooleanColumn(t, { dataIndex: 'isComposite', width: 140, title: t("product.is_composite") }),
    createBooleanColumn(t, { dataIndex: 'isSerialized', width: 140, title: t("product.is_serialized") }),
    // updatedAt
    createTimeStampColumn(t,
      {
        dataIndex: 'updatedAt',
        title: t('product.updated_at')
      }
    ),
    // createdAt
    createTimeStampColumn(t,
      {
        dataIndex: 'createdAt',
        title: t('product.created_at')
      }
    ),
    // deletedAt
    createTimeStampColumn(t,
      {
        dataIndex: 'deletedAt',
        title: t('product.deleted_at')
      }
    ),
  ]
}

export default createProductTableColumns
