import PageLoader from '@/modules/core/components/PageLoader';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createBrandTableColumns from '../../config/brand/create-brand-tablecolumns';
import createBrandQueryFields from '../../config/brand/create-brand-queryfields';
import { Form } from 'antd';
import BrandFormFields from '../../form-fields/BrandFormFields/BrandFormFields';
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import CrudModule from '@/modules/core/features/CrudModule';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Brand>>> = React.lazy(() => import('@/modules/core/features/CrudTable'));

const BrandsPage: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<Brand>();
    const [editFormInstance] = Form.useForm<Brand>();

    return (
        <CrudModule header title={'title.brands'} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="brand"
                    columns={createBrandTableColumns(t)}
                    dataSource={[]}
                    tableKey="brand-table"
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
                        formFields: <BrandFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance
                    }}
                    editFormProps={{
                        formFields: <BrandFormFields formInstance={editFormInstance} isEditForm />,
                        formInstance: editFormInstance,
                    }}
                    queryFormFields={createBrandQueryFields(t)}
                />
            </Suspense>
        </CrudModule>
    )
}

export default BrandsPage;