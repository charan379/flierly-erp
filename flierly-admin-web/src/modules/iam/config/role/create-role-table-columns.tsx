import ResizableDrawer from '@/components/ResizableDrawer'
import AssociationManager from '@/features/GenericAssignmentManager'
import { ProColumns } from '@ant-design/pro-components'
import { Button } from 'antd'
import createPrivilegeTableColumns from '../privilege/create-privilege-tablecolumns'
import createPrivilegeAMQueryFields from '../privilege/create-privilege-am-queryfields'
import { createBooleanColumn, createCodeColumn, createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/utils/create-tablecolumn'

const createRoleTableColumns = (translate: (value: string) => string, hasPermission: (requiredPermissionRegex: RegExp) => boolean): ProColumns<Role>[] => {
  return [
    // id
    createIdColumn(translate),
    // name
    createNameColumn(translate),
    // code
    createCodeColumn(translate),
    // description
    createDescriptionColumn(translate),
    // privileges
    {
      title: translate('privileges'),
      dataIndex: 'privileges',
      key: 'privileges',
      width: 150,
      align: 'center',
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
              associatedEntityColumns={createPrivilegeTableColumns(translate, hasPermission).filter((column) => ['id', 'name', 'code', 'entity', 'access', 'isActive'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={createPrivilegeAMQueryFields(translate)}
            />
          </ResizableDrawer>
        )
      },
    },
    // isActive
    createBooleanColumn(translate, { dataIndex: 'isActive' }),
    // updatedAt
    createTimeStampColumn(translate, { title: translate('updated_at'), dataIndex: 'updatedAt' }),
    // createdAt
    createTimeStampColumn(translate, { title: translate('created_at'), dataIndex: 'createdAt' }),
    // deletedAt
    createTimeStampColumn(translate, { title: translate('deleted_at'), dataIndex: 'deletedAt' }),
  ]
}

export default createRoleTableColumns
