import PageLoader from '@/modules/core/components/PageLoader';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createProductCategoryTableColumns from '../../config/product-category/create-product-category-tablecolumns';
import createProductCategoryQueryFields from '../../config/product-category/create-product-category-queryfields';
import { Form } from 'antd';
import ProductCategoryFormFields from '../../form-fields/ProductCategoryFormFields';
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import CrudModule from '@/modules/core/features/CrudModule';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<ProductCategory>>> = React.lazy(() => import('@/modules/core/features/CrudTable'));

const ProductCategoriesPage: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<ProductCategory>();
    const [editFormInstance] = Form.useForm<ProductCategory>();

    return (
        <CrudModule header title={t('title.product-categories')} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="product-category"
                    columns={createProductCategoryTableColumns(t)}
                    dataSource={[]}
                    tableKey="product-category-table"
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
                        formFields: <ProductCategoryFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance
                    }}
                    editFormProps={{
                        formFields: <ProductCategoryFormFields formInstance={editFormInstance} isEditForm />,
                        formInstance: editFormInstance
                    }}
                    queryFormFields={createProductCategoryQueryFields(t)}
                />
            </Suspense>
        </CrudModule>
    )
}

export default ProductCategoriesPage;