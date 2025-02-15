import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import PageLoader from '@/modules/core/components/PageLoader'
import createUserTableColumns from '../../config/user/create-user-table-columns'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import createUserQueryBuilderFields from '../../config/user/create-user-queryfields'
import UserFormFields from '../../form-fields/UserFormFields/UserFormFields'
import { Form } from 'antd'
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import CrudModule from '@/modules/core/features/CrudModule'

// Lazy load CrudTable
const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<User>>> = React.lazy(() => import('@/modules/core/features/CrudTable'))

const UsersPage: React.FC = () => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();
  const [addFormInstance] = Form.useForm<User>();
  const [editFormInstace] = Form.useForm<User>();

  return (
    <CrudModule header title={'users'} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="user"
          columns={createUserTableColumns(translate, hasPermission)}
          dataSource={[]}
          tableKey="user-table"
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
            formFields: <UserFormFields formInstance={addFormInstance} />,
            formInstance: addFormInstance
          }}
          editFormProps={{
            formFields: <UserFormFields formInstance={editFormInstace} isEditForm />,
            formInstance: editFormInstace
          }}
          queryFormFields={createUserQueryBuilderFields(translate)}
        />
      </Suspense>
    </CrudModule>
  )
}

export default UsersPage
