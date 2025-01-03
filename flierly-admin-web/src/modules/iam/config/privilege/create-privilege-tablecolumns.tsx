import { createBooleanColumn, createCodeColumn, createEntityColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

const createPrivilegeTableColumns = (translate: (value: string) => string, _hasPermission: (requiredPermissionRegex: RegExp) => boolean): ProColumns<Privilege>[] => {
  return [
    // id
    createIdColumn(translate),
    // name
    createNameColumn(translate),
    // entity
    createEntityColumn(translate),
    // access
    {
      title: translate('access_type'),
      dataIndex: 'access',
      key: 'access',
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
    // status
    createBooleanColumn(translate, { dataIndex: 'isActive', width: 80 }),
    // code
    createCodeColumn(translate, { width: 200 }),
    // updatedAt
    createTimeStampColumn(translate, { title: translate('updated_at'), dataIndex: 'updatedAt' }),
    // createdAt
    createTimeStampColumn(translate, { title: translate('created_at'), dataIndex: 'createdAt' }),
    // deletedAt
    createTimeStampColumn(translate, { title: translate('deleted_at'), dataIndex: 'deletedAt' }),
  ]
}

export default createPrivilegeTableColumns
