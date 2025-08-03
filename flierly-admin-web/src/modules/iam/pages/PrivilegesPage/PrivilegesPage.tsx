import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createPrivilegeTableColumns from '../../config/privilege/create-privilege-tablecolumns'
import createPrivilegeBuilderQueryFields from '../../config/privilege/create-privilege-queryfields'
import PageLoader from '@/modules/core/components/PageLoader'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { Form } from 'antd'
import PrivilegeFormFields from '../../form-fields/PrivilegeFormFields'
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import CrudModule from '@/modules/core/features/CrudModule'

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Privilege>>> = React.lazy(() => import('@/modules/core/features/CrudTable'))

const PrivilegesPage: React.FC = () => {
  const { translate: t } = useLocale();
  const { hasPermission } = useAuth();
  const [addFormInstance] = Form.useForm<Privilege>();
  const [editFormInstance] = Form.useForm<Privilege>();

  return (
    <CrudModule header title={t("title.privileges")} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="privilege"
          columns={createPrivilegeTableColumns(t, hasPermission)}
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
          addFormProps={{
            formFields: <PrivilegeFormFields formInstance={addFormInstance} />,
            formInstance: addFormInstance
          }}
          editFormProps={{
            formFields: <PrivilegeFormFields formInstance={editFormInstance} isEditForm />,
            formInstance: editFormInstance,
          }}
          queryFormFields={createPrivilegeBuilderQueryFields(t)}
        />
      </Suspense>
    </CrudModule>
  )
}

export default PrivilegesPage
