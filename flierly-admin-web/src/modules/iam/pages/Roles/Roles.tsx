import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createRoleTableColumns from '../../config/role/create-role-tablecolumns'
import PageLoader from '@/modules/core/components/PageLoader'
import createRoleQueryBuilderFields from '../../config/role/create-role-queryfields'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { Form } from 'antd'
import RoleFormFields from '../../form-fields/RoleFormFields/RoleFormFields'
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import CrudModule from '@/modules/core/features/CrudModule'

// Lazy load CrudTable
const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Role>>> = React.lazy(() => import('@/modules/core/features/CrudTable'))

const Roles: React.FC = () => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();
  const [addFormInstance] = Form.useForm<Role>();
  const [editFormInstace] = Form.useForm<Role>();

  return (
    <CrudModule header title={'roles'} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="role"
          columns={createRoleTableColumns(translate, hasPermission)}
          dataSource={[]}
          tableKey="role-table"
          rowKey="id"
          render={{
            activate: true,
            bin: true,
            clear: true,
            create: true,
            delete: true,
            menu: true,
            restore: true,
            search: true,
            update: true,
            view: true,
            builtIn: {
              options: {
                density: true,
                fullScreen: true,
                reload: true,
                search: false,
                setting: true,
              },
            },
          }}
          addFormProps={{
            formFields: <RoleFormFields formInstance={addFormInstance} />,
            formInstance: addFormInstance
          }}
          editFormProps={{
            formFields: <RoleFormFields formInstance={editFormInstace} isEditForm />,
            formInstance: editFormInstace
          }}
          queryFormFields={createRoleQueryBuilderFields(translate)}
        />
      </Suspense>
    </CrudModule>
  )
}

export default Roles
