import AssociationManager from '@/features/GenericAssignmentManager/GenericAssignmentManager'
import ResizableDrawer from '@/components/ResizableDrawer'
import privilegeTableColumns from '../../config/privilege/tableColumns'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetchEntityOptions'

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
        associatedEntityColumns={privilegeTableColumns.filter((column) => ['id', 'name', 'code', 'entity', 'access'].includes(column.dataIndex as string))}
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
