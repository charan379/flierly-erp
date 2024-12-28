import formatDateToLocaleTimezone from '@/utils/format-date-time-to-locale-timezone'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

const createProductCategoryTableColumns = (translate: (value: string) => string): ProColumns<ProductCategory>[] => {
  return [
    // id
    {
      title: translate("id"),
      dataIndex: 'id',
      key: 'id',
      order: 0,
      valueType: 'digit',
      search: false,
      width: 80,
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    // name
    {
      title: translate('name'),
      dataIndex: 'name',
      key: 'name',
      order: 1,
      valueType: 'text',
      sorter: true,
    },
    // description
    {
      title: translate('description'),
      dataIndex: 'description',
      key: 'description',
      order: 2,
      valueType: 'text',
      ellipsis: true,
    },
    // isActive
    {
      title: translate("status"),
      dataIndex: 'isActive',
      key: 'isActive',
      order: 3,
      valueType: 'switch',
      filters: true,
      onFilter: true,
      align: 'center',
      width: '80px',
      render: (_text, entity) => {
        return !entity.isActive ? <Tag color="red">InActive</Tag> : <Tag color="green">Active</Tag>
      },
    },
    // updatedAt
    {
      title: translate('updated_at'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      order: 4,
      valueType: 'text',
      sorter: true,
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YYYY HH:mm:ss', true)
      },
    },
    // createdAt
    {
      title: translate('created_at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      order: 5,
      valueType: 'text',
      sorter: true,
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YYYY HH:mm:ss', true)
      },
    },
  ]
}

export default createProductCategoryTableColumns
