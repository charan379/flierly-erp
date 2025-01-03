import PageLoader from '@/components/PageLoader';
import CrudModule from '@/features/CrudModule';
import { CrudTableProps } from '@/features/CrudTable/CrudTable';
import useLocale from '@/features/Locale/hooks/useLocale';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createProductSubCategoryTableColumns from '../../config/product-subcategory/create-product-subcategory-tablecolumns';
import createProductSubcategoryQueryFields from '../../config/product-subcategory/create-product-subcategory-queryfields';
import { Form } from 'antd';
import ProductSubCategoryFormFields from '../../form-fields/ProductSubCategoryFormFields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<ProductSubCategory>>> = React.lazy(() => import('@/features/CrudTable'))

const ProductSubcategories: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<ProductSubCategory>();
    const [editFormInstance] = Form.useForm<ProductSubCategory>();

    return (
        <CrudModule header title={'product-sub-category'} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="product-sub-category"
                    columns={createProductSubCategoryTableColumns(t)}
                    dataSource={[]}
                    tableKey="brand-table"
                    rowKey="id"
                    loadRelations={['category']}
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
                        formFields: <ProductSubCategoryFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance,
                        title: t('entity.add')
                    }}
                    editFormProps={{
                        formFields: <ProductSubCategoryFormFields formInstance={editFormInstance} isEditForm />,
                        formInstance: editFormInstance,
                        title: t("entity.update"),
                        processDataForFormInitialValues(data) {
                            return {
                                ...data,
                                category: typeof data?.category === 'number' ? data?.category : data.category?.id,
                            }
                        },
                    }}
                    queryFormFields={createProductSubcategoryQueryFields(t)}
                />
            </Suspense>
        </CrudModule>
    )
}

export default ProductSubcategories;