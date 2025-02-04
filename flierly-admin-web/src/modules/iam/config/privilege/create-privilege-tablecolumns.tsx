import { createBooleanColumn, createCodeColumn, createEntityColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
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
          case 'create':
            return <Tag color="#50C878">{translate(entity.access)}</Tag>
          case 'read':
            return <Tag color="#008080">{translate(entity.access)}</Tag>
          case 'update':
            return <Tag color="#FF7F50">{translate(entity.access)}</Tag>
          case 'manage':
            return <Tag color="#191970">{translate(entity.access)}</Tag>
          case 'delete':
            return <Tag color="#DC143C">{translate(entity.access)}</Tag>
          default:
            return <Tag>{translate(entity.access)}</Tag>
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
