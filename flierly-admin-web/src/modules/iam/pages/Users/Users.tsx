import CrudModule from '@/features/CrudModule'
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import PageLoader from '@/components/PageLoader'
import { CrudTableProps } from '@/features/CrudTable/CrudTable'
import createUserTableColumns from '../../config/user/create-user-table-columns'
import useLocale from '@/features/Locale/hooks/useLocale'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import createUserQueryFields from '../../config/user/create-user-queryfields'
import UserFormFields from '../../form-fields/UserFormFields/UserFormFields'
import { Form } from 'antd'

// Lazy load CrudTable
const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<User>>> = React.lazy(() => import('@/features/CrudTable'))

const Users: React.FC = () => {
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
          queryFormFields={createUserQueryFields(translate)}
        />
      </Suspense>
    </CrudModule>
  )
}

export default Users
