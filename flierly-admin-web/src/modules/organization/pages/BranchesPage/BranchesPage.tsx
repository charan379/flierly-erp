import PageLoader from '@/modules/core/components/PageLoader';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import { Form } from 'antd';
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import CrudModule from '@/modules/core/features/CrudModule';
import createBranchTableColumns from '../../config/branch/create-branch-tablecolumns';
import BranchFormFields from '../../form-fields/BranchFormFields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Branch>>> = React.lazy(() => import('@/modules/core/features/CrudTable'));

const BranchesPage: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<Branch>();
    const [editFormInstance] = Form.useForm<Branch>();

    return (
        <CrudModule header title={t('branches')} menuKeys={['organization']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="branch"
                    columns={createBranchTableColumns(t)}
                    dataSource={[]}
                    tableKey="branch-table"
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
                        formFields: <BranchFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance
                    }}
                    editFormProps={{
                        formFields: <BranchFormFields formInstance={editFormInstance} isEditForm />,
                        formInstance: editFormInstance,
                    }}
                />
            </Suspense>
        </CrudModule>
    )
}

export default BranchesPage;