import ResizableDrawer from '@/modules/core/components/ResizableDrawer'
import { ProColumns } from '@ant-design/pro-components'
import { Button } from 'antd'
import createPrivilegeTableColumns from '../privilege/create-privilege-tablecolumns'
import createPrivilegeAMQueryBuilderFields from '../privilege/create-privilege-am-queryfields'
import { createBooleanColumn, createCodeColumn, createDescriptionColumn, createIdColumn, createNameColumn, createTimeStampColumn } from '@/modules/core/utils/create-tablecolumn'
import AssociationManager from '@/modules/core/features/GenericAssignmentManager'

const createRoleTableColumns = (t: (value: string) => string, hasPermission: (requiredPermissionRegex: RegExp) => boolean): ProColumns<Role>[] => {
  return [
    // id
    createIdColumn(t),
    // isActive
    createBooleanColumn(t, { dataIndex: 'isActive', width: 110 }),
    // name
    createNameColumn(t),
    // code
    createCodeColumn(t),
    // description
    createDescriptionColumn(t),
    // privileges
    {
      title: t('title.privileges'),
      dataIndex: 'privileges',
      key: 'privileges',
      width: 200,
      align: 'center',
      render: (_, record) => {
        return (
          <ResizableDrawer
            title={<span style={{ padding: 0, textAlign: 'left' }}>{`${t("title.manage_privileges")}: ${record.name}`}</span>}
            initialWidth={1200}
            destroyOnClose
            styles={{
              footer: { padding: '15px 15px 15px 15px' },
              header: { padding: '10px 10px 10px 10px', textAlign: 'left' },
            }}
            trigger={<Button type="link">{t("button.manage_privileges")}</Button>}
          >
            <AssociationManager<Role, Privilege>
              entity="role"
              entityRecord={record}
              entitySideField="privileges"
              associatedEntity="privilege"
              associatedSideField="roles"
              associatedEntityColumns={createPrivilegeTableColumns(t, hasPermission).filter((column) => ['id', 'name', 'code', 'entity', 'access', 'isActive'].includes(column.dataIndex as string))}
              associatedEntityQueryConfig={createPrivilegeAMQueryBuilderFields(t)}
            />
          </ResizableDrawer>
        )
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

export default createRoleTableColumns
