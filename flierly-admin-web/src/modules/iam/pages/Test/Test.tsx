import AssociationManager from '@/features/GenericAssignmentManager/GenericAssignmentManager'
import ResizableDrawer from '@/components/ResizableDrawer'
import createPrivilegeTableColumns from '../../config/privilege/create-privilege-tablecolumns'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options'

const ParentComponent = () => {
  const parentEntity: Role = {
    id: 2,
    name: 'Test Role',
    code: 'test-role',
    createdAt: new Date(),
    deletedAt: new Date(),
    description: '',
    isActive: true,
    updatedAt: new Date(),
  }

  return (
    <ResizableDrawer>
      <AssociationManager<Role, Privilege>
        owningEntity="role"
        owningEntityRow={parentEntity}
        owningSideField="roles"
        associatedEntity="privilege"
        associatedSideField="privileges"
        associatedEntityColumns={createPrivilegeTableColumns.filter((column) => ['id', 'name', 'code', 'entity', 'access'].includes(column.dataIndex as string))}
        associatedEntityQueryConfig={[
          { label: 'Name', name: 'name', formField: { input: { type: 'Text' } } },
          { label: 'Code', name: 'code', formField: { input: { type: 'Text' } } },
          {
            label: 'Entity',
            name: 'entity',
            formField: {
              input: {
                type: 'SelectRemoteOptions',
                asyncOptionsFetcher: fetchEntityOptions,
                debounceTimeout: 300,
                mode: 'multiple',
              },
              rules: [{ type: 'array' }],
            },
          },
        ]}
      />
    </ResizableDrawer>
  )
}

export default ParentComponent
