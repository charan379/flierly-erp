import formatDateToLocaleTimezone from '@/utils/format-date-time-to-locale-timezone'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

const createPrivilegeTableColumns = (translate: (value: string) => string): ProColumns<Privilege>[] => {

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
      title: translate('privilege_name'),
      dataIndex: 'name',
      key: 'name',
      order: 1,
      valueType: 'text',
      sorter: true,
      width: 250
    },
    // entity
    {
      title: translate('entity'),
      dataIndex: 'entity',
      key: 'entity',
      order: 2,
      valueType: 'text',
      sorter: true,
      width: 180
    },
    // access
    {
      title: translate('access_type'),
      dataIndex: 'access',
      key: 'access',
      order: 3,
      width: 100,
      align: 'center',
      render: (_dom, entity) => {
        switch (entity.access) {
          case 'Create':
            return <Tag color="#50C878">{entity.access}</Tag>
          case 'Read':
            return <Tag color="#008080">{entity.access}</Tag>
          case 'Update':
            return <Tag color="#FF7F50">{entity.access}</Tag>
          case 'Manage':
            return <Tag color="#191970">{entity.access}</Tag>
          case 'Delete':
            return <Tag color="#DC143C">{entity.access}</Tag>
          default:
            return <Tag>{entity.access}</Tag>
        }
      },
    },
    // isActive
    {
      title: translate("status"),
      dataIndex: 'isActive',
      key: 'isActive',
      order: 4,
      valueType: 'switch',
      filters: true,
      onFilter: true,
      align: 'center',
      width: 80,
      render: (_text, entity) => {
        return !entity.isActive ? <Tag color="red">InActive</Tag> : <Tag color="green">Active</Tag>
      },
    },
    // code
    {
      title: translate('code'),
      dataIndex: 'code',
      key: 'code',
      order: 5,
      valueType: 'text',
      width: 250
    },
    // updatedAt
    {
      title: translate('updated_at'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      order: 6,
      valueType: 'text',
      sorter: true,
      width: 150,
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YYYY HH:mm:ss', true)
      },
    },
    // createdAt
    {
      title: translate('created_at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      order: 7,
      valueType: 'text',
      sorter: true,
      width: 150,
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YYYY HH:mm:ss', true)
      },
    },
    // deletedAt
    {
      title: translate('deleted_at'),
      dataIndex: 'deletedAt',
      key: 'deletedAt',
      order: 8,
      valueType: 'text',
      sorter: true,
      width: 150,
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YY HH:mm:ss', true)
      },
    },
  ]
}

export default createPrivilegeTableColumns
