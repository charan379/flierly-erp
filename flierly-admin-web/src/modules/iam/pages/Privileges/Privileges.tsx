import CrudModule from '@/features/CrudModule'
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createPrivilegeTableColumns from '../../config/privilege/create-privilege-tablecolumns'
import createPrivilegeAddFormFields from '../../config/privilege/create-privilege-add-formfields'
import createPrivilegeEditFormFields from '../../config/privilege/create-privilege-edit-formfields'
import createPrivilegeQueryFields from '../../config/privilege/create-privilege-queryfields'
import { CrudTableProps } from '@/features/CrudTable/CrudTable'
import PageLoader from '@/components/PageLoader'
import useLocale from '@/features/Locale/hooks/useLocale'
import { useAuth } from '@/modules/auth/hooks/useAuth'

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Privilege>>> = React.lazy(() => import('@/features/CrudTable'))

const Privileges: React.FC = () => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();
  return (
    <CrudModule header title={'privileges'} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="privilege"
          columns={createPrivilegeTableColumns(translate, hasPermission)}
          dataSource={[]}
          tableKey="privilege-table"
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
          createFormFields={createPrivilegeAddFormFields()}
          updateFormFields={createPrivilegeEditFormFields()}
          queryFormFields={createPrivilegeQueryFields(translate)}
        />
      </Suspense>
    </CrudModule>
  )
}

export default Privileges
