import ResizableDrawer from '@/components/ResizableDrawer'
import AssociationManager from '@/features/GenericAssignmentManager'
import { ProColumns } from '@ant-design/pro-components'
import { Button } from 'antd'
import createPrivilegeTableColumns from '../privilege/create-privilege-table-columns'
import createPrivilegeAMQueryFields from '../privilege/create-privilege-am-queryfields'
import createRoleTableColumns from '../role/create-role-table-columns'
import UserPasswordUpdate from '../../features/UserPasswordUpdate'
import { createBooleanColumn, createEmailColumn, createIdColumn, createMobileColumn, createTimeStampColumn } from '@/utils/create-table-column'
import createRoleAMQueryFields from '../role/create-role-am-queryfileds'

const createUserTableColumns = (translate: (value: string) => string, _hasPermission: (requiredPermissionRegex: RegExp) => boolean): ProColumns<User>[] => {
  return [
    // id
    createIdColumn(translate),
    // name
    {
      title: translate('username'),
      dataIndex: 'username',
      key: 'username',
      valueType: 'text',
      sorter: true,
      width: 200,
    },
    // mobile
    createMobileColumn(translate),
    // email
    createEmailColumn(translate),
    // isActive
    createBooleanColumn(translate, { dataIndex: 'isActive' }),
    // Additional Privileges
    {
      title: `${translate('additional')} ${translate('privileges')}`,
      dataIndex: 'additionalPrivileges',
      key: 'additionalPrivileges',
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
              associatedEntityColumns={createPrivilegeTableColumns(translate, _hasPermission).filter((column) => ['id', 'name', 'code', 'entity', 'access', 'isActive'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={createPrivilegeAMQueryFields(translate)}
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
              associatedEntityColumns={createPrivilegeTableColumns(translate, _hasPermission).filter((column) => ['id', 'name', 'code', 'entity', 'access', 'isActive'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={createPrivilegeAMQueryFields(translate)}
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
      align: 'center',
      width: 100,
      render: (_, entity) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`Manage roles for : ${entity.username}`}</span>}
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
              associatedEntityColumns={createRoleTableColumns(translate, _hasPermission).filter((column) => ['id', 'name', 'code', 'isActive'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={createRoleAMQueryFields(translate)}
            />
          </ResizableDrawer>
        )
      },
    },
    // password
    {
      title: translate('password'),
      key: 'password',
      align: 'center',
      width: 180,
      render: (_dom, entity, _index, _action, _schema) => {
        return <UserPasswordUpdate userId={entity.id} />
      },
    },
    // updatedAt
    createTimeStampColumn(translate, { title: translate('updated_at'), dataIndex: 'updatedAt' }),
    // createdAt
    createTimeStampColumn(translate, { title: translate('created_at'), dataIndex: 'createdAt' }),
    // deletedAt
    createTimeStampColumn(translate, { title: translate('deleted_at'), dataIndex: 'deletedAt' }),
  ]
}

export default createUserTableColumns
