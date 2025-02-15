import ResizableDrawer from '@/modules/core/components/ResizableDrawer'
import { ProColumns } from '@ant-design/pro-components'
import { Button } from 'antd'
import createPrivilegeTableColumns from '../privilege/create-privilege-tablecolumns'
import createPrivilegeAMQueryBuilderFields from '../privilege/create-privilege-am-queryfields'
import createRoleTableColumns from '../role/create-role-tablecolumns'
import UserPasswordUpdate from '../../features/UserPasswordUpdate'
import { createBooleanColumn, createEmailColumn, createIdColumn, createMobileColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
import createRoleAMQueryBuilderFields from '../role/create-role-am-queryfields'
import AssociationManager from '@/modules/core/features/GenericAssignmentManager'

const createUserTableColumns = (t: (value: string) => string, _hasPermission: (requiredPermissionRegex: RegExp) => boolean): ProColumns<User>[] => {
  return [
    // id
    createIdColumn(t),
    // isActive
    createBooleanColumn(t, { dataIndex: 'isActive', width: 110 }),
    // username
    {
      title: t('record.username'),
      dataIndex: 'username',
      key: 'username',
      valueType: 'text',
      sorter: true,
      width: 200,
    },
    // email
    createEmailColumn(t),
    // mobile
    createMobileColumn(t),
    // Additional Privileges
    {
      title: `${t('title.additional_privileges')}`,
      dataIndex: 'additionalPrivileges',
      key: 'additionalPrivileges',
      align: 'center',
      width: 250,
      render: (_, record) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`${t("title.manage_additional_privileges")}: ${record.username}`}</span>}
            initialWidth={1200}
            destroyOnClose
            styles={{
              footer: { padding: '15px 15px 15px 15px' },
              header: { padding: '10px 10px 10px 10px', textAlign: 'left' },
            }}
            trigger={<Button type="link">{t("button.manage_additional_privileges")}</Button>}
          >
            <AssociationManager<User, Privilege>
              entity="user"
              entityRecord={record}
              entitySideField="additionalPrivileges"
              associatedEntity="privilege"
              associatedSideField='usersWithAdditionalPrivileges'
              associatedEntityColumns={createPrivilegeTableColumns(t, _hasPermission).filter((column) => ['id', 'name', 'code', 'entity', 'access', 'isActive'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={createPrivilegeAMQueryBuilderFields(t)}
            />
          </ResizableDrawer>
        )
      },
    },
    // Restricted Privileges
    {
      title: `${t('title.restricted_privileges')}`,
      dataIndex: 'restrictedPrivileges',
      key: 'restrictedPrivileges',
      align: 'center',
      width: 250,
      render: (_, record) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`${t("title.manage_restricted_privileges")} : ${record.username}`}</span>}
            initialWidth={1200}
            destroyOnClose
            styles={{
              footer: { padding: '15px 15px 15px 15px' },
              header: { padding: '10px 10px 10px 10px', textAlign: 'left' },
            }}
            trigger={<Button type="link">{t("button.manage_restricted_privileges")}</Button>}
          >
            <AssociationManager<User, Privilege>
              entity="user"
              entityRecord={record}
              entitySideField="restrictedPrivileges"
              associatedEntity="privilege"
              associatedSideField="usersWithRestrictedPrivileges"
              associatedEntityColumns={createPrivilegeTableColumns(t, _hasPermission).filter((column) => ['id', 'name', 'code', 'entity', 'access', 'isActive'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={createPrivilegeAMQueryBuilderFields(t)}
            />
          </ResizableDrawer>
        )
      },
    },
    // Roles
    {
      title: t('title.roles'),
      dataIndex: 'roles',
      key: 'roles',
      align: 'center',
      width: 180,
      render: (_, record) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`${t("title.manage_roles")} : ${record.username}`}</span>}
            initialWidth={1200}
            destroyOnClose
            styles={{
              footer: { padding: '15px 15px 15px 15px' },
              header: { padding: '10px 10px 10px 10px', textAlign: 'left' },
            }}
            trigger={<Button type="link">{t("button.manage_roles")}</Button>}
          >
            <AssociationManager<User, Role>
              entity="user"
              entityRecord={record}
              entitySideField="roles"
              associatedEntity="role"
              associatedSideField="users"
              associatedEntityColumns={createRoleTableColumns(t, _hasPermission).filter((column) => ['id', 'name', 'code', 'isActive'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={createRoleAMQueryBuilderFields(t)}
            />
          </ResizableDrawer>
        )
      },
    },
    // password
    {
      title: t('title.password'),
      key: 'password',
      align: 'center',
      width: 200,
      render: (_dom, record, _index, _action, _schema) => {
        return <UserPasswordUpdate userId={record.id} username={record.username} />
      },
    },
    // updatedAt
    createTimeStampColumn(t, { title: t('record.updated_at'), dataIndex: 'updatedAt' }),
    // createdAt
    createTimeStampColumn(t, { title: t('record.created_at'), dataIndex: 'createdAt' }),
    // deletedAt
    createTimeStampColumn(t, { title: t('record.deleted_at'), dataIndex: 'deletedAt' }),
  ]
}

export default createUserTableColumns
