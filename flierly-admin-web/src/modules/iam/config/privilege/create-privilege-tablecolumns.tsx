import { createBooleanColumn, createCodeColumn, createEntityColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
import { ProColumns } from '@ant-design/pro-components'
import { Tag } from 'antd'

const createPrivilegeTableColumns = (t: (value: string) => string, _hasPermission: (requiredPermissionRegex: RegExp) => boolean): ProColumns<Privilege>[] => {
  return [
    // id
    createIdColumn(t),
    // isActive
    createBooleanColumn(t, { dataIndex: 'isActive', width: 110 }),
    // name
    createNameColumn(t),
    // access
    {
      title: t('privilege.access'),
      dataIndex: 'access',
      key: 'access',
      width: 120,
      align: 'center',
      render: (_dom, record) => {
        switch (record.access) {
          case 'create':
            return <Tag color="#50C878">{t(record.access)}</Tag>
          case 'read':
            return <Tag color="#008080">{t(record.access)}</Tag>
          case 'update':
            return <Tag color="#FF7F50">{t(record.access)}</Tag>
          case 'manage':
            return <Tag color="#191970">{t(record.access)}</Tag>
          case 'delete':
            return <Tag color="#DC143C">{t(record.access)}</Tag>
          default:
            return <Tag>{t(record.access)}</Tag>
        }
      },
    },
    // entity
    createEntityColumn(t),
    // code
    createCodeColumn(t, { width: 200 }),
    // updatedAt
    createTimeStampColumn(t, { title: t('record.updated_at'), dataIndex: 'updatedAt' }),
    // createdAt
    createTimeStampColumn(t, { title: t('record.created_at'), dataIndex: 'createdAt' }),
    // deletedAt
    createTimeStampColumn(t, { title: t('record.deleted_at'), dataIndex: 'deletedAt' }),
  ]
}

export default createPrivilegeTableColumns
