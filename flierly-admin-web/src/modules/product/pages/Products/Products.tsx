import PageLoader from '@/modules/core/components/PageLoader';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createProductTableColumns from '../../config/product/create-product-tablecolumns';
import { Form } from 'antd';
import ProductFormFields from '../../form-fields/ProductFormFields';
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import CrudModule from '@/modules/core/features/CrudModule';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Product>>> = React.lazy(() => import('@/modules/core/features/CrudTable'));

const Products: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<Product>();
    const [editFormInstace] = Form.useForm<Product>();

    return (
        <CrudModule header title={t('products')} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    tableKey="product-table"
                    rowKey="id"
                    entity="product"
                    columns={createProductTableColumns(t)}
                    dataSource={[]}
                    loadRelations={['brand', 'category', 'subCategory']}
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
                        formFields: <ProductFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance,
                        title: t('record.add'),
                    }}
                    editFormProps={{
                        formFields: <ProductFormFields formInstance={editFormInstace} isEditForm />,
                        formInstance: editFormInstace,
                        title: t("record.update"),
                        processDataForFormInitialValues(data) {
                            return {
                                ...data,
                                brandId: data.brandId,
                                categoryId: data.categoryId,
                                subCategoryId: data.subCategoryId
                            }
                        },
                    }}
                />
            </Suspense>
        </CrudModule>
    )
}

export default Products;