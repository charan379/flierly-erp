import ResizableDrawer from '@/components/ResizableDrawer'
import AssociationManager from '@/features/GenericAssignmentManager'
import { ProColumns } from '@ant-design/pro-components'
import { Button, Tag } from 'antd'
import formatDateToLocaleTimezone from '@/utils/format-date-time-to-locale-timezone'
import _ from 'lodash'
import createPrivilegeTableColumns from '../privilege/create-privilege-table-columns'
import privilegeAssociatedEntityQueryFormFields from '../privilege/privilege-associated-entity-query-form-fields'
import roleAssociatedEntityQueryFormFields from '../role/role-associated-entity-query-form-fields'
import createRoleTableColumns from '../role/create-role-table-columns'
import UserPasswordUpdate from '../../features/UserPasswordUpdate'

const createUserTableColumns = (translate: (value: string) => string): ProColumns<User>[] => {
  return [
    // id
    {
      title: translate('id'),
      dataIndex: 'id',
      key: 'id',
      order: 0,
      valueType: 'digit',
      search: false,
      sorter: true,
      defaultSortOrder: 'ascend',
      width: 50,
    },
    // name
    {
      title: translate('username'),
      dataIndex: 'username',
      key: 'username',
      order: 1,
      valueType: 'text',
      sorter: true,
      width: 200,
    },
    // mobile
    {
      title: translate('mobile'),
      dataIndex: 'mobile',
      key: 'mobile',
      order: 2,
      valueType: 'text',
      sorter: true,
      copyable: true,
      width: 150,
    },
    // email
    {
      title: translate('email'),
      dataIndex: 'email',
      key: 'email',
      order: 3,
      valueType: 'text',
      sorter: true,
      copyable: true,
      width: 200,
    },
    // isActive
    {
      title: translate('status'),
      dataIndex: 'isActive',
      key: 'isActive',
      order: 4,
      valueType: 'switch',
      filters: true,
      onFilter: true,
      align: 'center',
      width: '80px',
      render: (_text, entity) => {
        return !entity.isActive ? <Tag color="red">InActive</Tag> : <Tag color="green">Active</Tag>
      },
    },
    // Additional Privileges
    {
      title: `${translate('additional')} ${translate('privileges')}`,
      dataIndex: 'additionalPrivileges',
      key: 'additionalPrivileges',
      order: 5,
      align: 'center',
      width: 150,
      render: (_, entity) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`Edit additional privileges for : ${entity.username}`}</span>}
            initialWidth={1200}
            destroyOnClose
            styles={{
              footer: { padding: '15px 15px 15px 15px' },
              header: { padding: '10px 10px 10px 10px', textAlign: 'left' },
            }}
            trigger={<Button type="link">Manage</Button>}
          >
            <AssociationManager<User, Privilege>
              owningEntity="user"
              owningEntityRow={entity}
              owningSideField="usersWithAdditionalPrivileges"
              associatedEntity="privilege"
              associatedSideField="additionalPrivileges"
              associatedEntityColumns={createPrivilegeTableColumns(translate).filter((column) => ['id', 'name', 'code', 'entity', 'access'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={privilegeAssociatedEntityQueryFormFields}
            />
          </ResizableDrawer>
        )
      },
    },
    // Restricted Privileges
    {
      title: `${translate('restricted')} ${translate('privileges')}`,
      dataIndex: 'restrictedPrivileges',
      key: 'restrictedPrivileges',
      order: 6,
      align: 'center',
      width: 150,
      render: (_, entity) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`Edit restricted privileges for : ${entity.username}`}</span>}
            initialWidth={1200}
            destroyOnClose
            styles={{
              footer: { padding: '15px 15px 15px 15px' },
              header: { padding: '10px 10px 10px 10px', textAlign: 'left' },
            }}
            trigger={<Button type="link">Manage</Button>}
          >
            <AssociationManager<User, Privilege>
              owningEntity="user"
              owningEntityRow={entity}
              owningSideField="usersWithRestrictedPrivileges"
              associatedEntity="privilege"
              associatedSideField="restrictedPrivileges"
              associatedEntityColumns={createPrivilegeTableColumns(translate).filter((column) => ['id', 'name', 'code', 'entity', 'access'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={privilegeAssociatedEntityQueryFormFields}
            />
          </ResizableDrawer>
        )
      },
    },
    // Roles
    {
      title: translate('roles'),
      dataIndex: 'roles',
      key: 'roles',
      order: 7,
      align: 'center',
      width: 100,
      render: (_, entity) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`Edit roles for : ${entity.username}`}</span>}
            initialWidth={1200}
            destroyOnClose
            styles={{
              footer: { padding: '15px 15px 15px 15px' },
              header: { padding: '10px 10px 10px 10px', textAlign: 'left' },
            }}
            trigger={<Button type="link">Manage</Button>}
          >
            <AssociationManager<User, Role>
              owningEntity="user"
              owningEntityRow={entity}
              owningSideField="users"
              associatedEntity="role"
              associatedSideField="roles"
              associatedEntityColumns={createRoleTableColumns(translate).filter((column) => ['id', 'name', 'code', 'active'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={roleAssociatedEntityQueryFormFields}
            />
          </ResizableDrawer>
        )
      },
    },
    // password
    {
      title: translate('password'),
      key: 'password',
      order: 8,
      align: 'center',
      width: 150,
      render: (_dom, entity, _index, _action, _schema) => {
        return <UserPasswordUpdate userId={entity.id} />
      },
    },
    // updatedAt
    {
      title: translate('updated_at'),
      dataIndex: 'updatedAt',
      order: 9,
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
      order: 10,
      valueType: 'text',
      sorter: true,
      width: 150,
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YY HH:mm:ss', true)
      },
    },
    // deletedAt
    {
      title: translate('deleted_at'),
      dataIndex: 'deletedAt',
      order: 11,
      valueType: 'text',
      sorter: true,
      width: 150,
      renderText(text, _record, _index, _action) {
        return formatDateToLocaleTimezone(text, 'DD-MM-YYYY HH:mm:ss', true)
      },
    },
  ]
}

export default createUserTableColumns
