import PageLoader from '@/components/PageLoader';
import CrudModule from '@/features/CrudModule';
import { CrudTableProps } from '@/features/CrudTable/CrudTable';
import useLocale from '@/features/Locale/hooks/useLocale';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createProductTableColumns from '../../config/product/create-product-tablecolumns';
import { Form } from 'antd';
import ProductFormFields from '../../form-fields/ProductFormFields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Product>>> = React.lazy(() => import('@/features/CrudTable'))

const Products: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<Product>();
    const [editFormInstace] = Form.useForm<Product>();

    console.log("re-rendered-products")
    return (
        <CrudModule header title={'products'} menuKeys={['product']}>
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
                        title: t('entity.add'),
                    }}
                    editFormProps={{
                        formFields: <ProductFormFields formInstance={editFormInstace} isEditForm />,
                        formInstance: editFormInstace,
                        title: t("entity.update"),
                        processDataForFormInitialValues(data) {
                            return {
                                ...data,
                                brand: typeof data?.brand === 'number' ? data?.brand : data.brand?.id,
                                category: typeof data?.category === 'number' ? data?.category : data.category?.id,
                                subCategory: typeof data?.subCategory === 'number' ? data?.subCategory : data.subCategory?.id
                            }
                        },
                    }}
                />
            </Suspense>
        </CrudModule>
    )
}

export default Products;