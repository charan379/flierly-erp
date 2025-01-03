import PageLoader from '@/components/PageLoader';
import CrudModule from '@/features/CrudModule';
import { CrudTableProps } from '@/features/CrudTable/CrudTable';
import useLocale from '@/features/Locale/hooks/useLocale';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createBrandTableColumns from '../../config/brand/create-brand-tablecolumns';
import createBrandQueryFields from '../../config/brand/create-brand-queryfields';
import { Form } from 'antd';
import BrandFormFields from '../../form-fields/BrandFormFields/BrandFormFields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Brand>>> = React.lazy(() => import('@/features/CrudTable'))

const Brands: React.FC = () => {
    const { translate } = useLocale();
    const [addFormInstance] = Form.useForm<Brand>();
    const [editFormInstance] = Form.useForm<Brand>();

    return (
        <CrudModule header title={'brands'} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="brand"
                    columns={createBrandTableColumns(translate)}
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
                    queryFormFields={createBrandQueryFields(translate)}
                />
            </Suspense>
        </CrudModule>
    )
}

export default Brands;