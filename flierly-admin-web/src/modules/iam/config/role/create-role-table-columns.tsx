import ResizableDrawer from '@/components/ResizableDrawer'
import AssociationManager from '@/features/GenericAssignmentManager'
import { ProColumns } from '@ant-design/pro-components'
import { Button, Tag } from 'antd'
import createPrivilegeTableColumns from '../privilege/create-privilege-table-columns'
import formatDateToLocaleTimezone from '@/utils/format-date-time-to-locale-timezone'
import _ from 'lodash'
import privilegeAssociatedEntityQueryFormFields from '../privilege/privilege-associated-entity-query-form-fields'

const createRoleTableColumns = (translate: (value: string) => string): ProColumns<Role>[] => {
  return [
    // id
    {
      title: translate('id'),
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
    // code
    {
      title: translate('code'),
      dataIndex: 'code',
      key: 'code',
      order: 2,
      valueType: 'text',
      sorter: true,
      copyable: true,
    },
    // description
    {
      title: translate('description'),
      dataIndex: 'description',
      key: 'description',
      order: 3,
      valueType: 'text',
      ellipsis: true,
    },
    // privileges
    {
      title: translate('privileges'),
      dataIndex: 'privileges',
      key: 'privileges',
      order: 4,
      render: (_, entity) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`Edit privileges for Role: ${entity.name}`}</span>}
            initialWidth={1200}
            destroyOnClose
            styles={{
              footer: { padding: '15px 15px 15px 15px' },
              header: { padding: '10px 10px 10px 10px', textAlign: 'left' },
            }}
            trigger={<Button type="link">Manage Privileges</Button>}
          >
            <AssociationManager<Role, Privilege>
              owningEntity="role"
              owningEntityRow={entity}
              owningSideField="roles"
              associatedEntity="privilege"
              associatedSideField="privileges"
              associatedEntityColumns={createPrivilegeTableColumns(translate).filter((column) => ['id', 'name', 'code', 'entity', 'access'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={privilegeAssociatedEntityQueryFormFields}
            />
          </ResizableDrawer>
        )
      },
    },
    // isActive
    {
      title: translate('status'),
      dataIndex: 'isActive',
      key: 'isActive',
      order: 5,
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
      order: 6,
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
      order: 7,
      valueType: 'text',
      sorter: true,
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YY HH:mm:ss', true)
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
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YYYY HH:mm:ss', true)
      },
    },
  ]
}

export default createRoleTableColumns
