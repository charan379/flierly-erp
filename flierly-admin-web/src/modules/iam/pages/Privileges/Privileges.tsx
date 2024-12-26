import CrudModule from '@/features/CrudModule'
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import privilegeTableColumns from '../../config/privilege/tableColumns'
import privilegeCreateFields from '../../config/privilege/createFormFields'
import privilegeUpdateFields from '../../config/privilege/updateFormFields'
import privilegeQueryFields from '../../config/privilege/queryFormFields'
import { CrudTableProps } from '@/features/CrudTable/CrudTable'
import PageLoader from '@/components/PageLoader'

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Privilege>>> = React.lazy(() => import('@/features/CrudTable'))

const Privileges: React.FC = () => {
  return (
    <CrudModule header title={'privileges'} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="privilege"
          columns={privilegeTableColumns}
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
          createFormFields={privilegeCreateFields}
          updateFormFields={privilegeUpdateFields}
          queryFormFields={privilegeQueryFields}
        />
      </Suspense>
    </CrudModule>
  )
}

export default Privileges
