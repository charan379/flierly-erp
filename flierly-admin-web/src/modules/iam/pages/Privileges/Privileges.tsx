import CrudModule from '@/features/CrudModule'
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createPrivilegeTableColumns from '../../config/privilege/create-privilege-table-columns'
import privilegeCreateFormFields from '../../config/privilege/privilege-create-form-fields'
import privilegeUpdateFormFields from '../../config/privilege/privilege-update-form-fields'
import privilegeQueryFormFields from '../../config/privilege/privilege-query-form-fields'
import { CrudTableProps } from '@/features/CrudTable/CrudTable'
import PageLoader from '@/components/PageLoader'
import useLocale from '@/features/Locale/hooks/useLocale'

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Privilege>>> = React.lazy(() => import('@/features/CrudTable'))

const Privileges: React.FC = () => {
  const { translate } = useLocale();

  return (
    <CrudModule header title={'privileges'} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="privilege"
          columns={createPrivilegeTableColumns(translate)}
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
          createFormFields={privilegeCreateFormFields}
          updateFormFields={privilegeUpdateFormFields}
          queryFormFields={privilegeQueryFormFields}
        />
      </Suspense>
    </CrudModule>
  )
}

export default Privileges
