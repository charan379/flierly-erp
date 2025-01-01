import PageLoader from '@/components/PageLoader';
import CrudModule from '@/features/CrudModule';
import { CrudTableProps } from '@/features/CrudTable/CrudTable';
import useLocale from '@/features/Locale/hooks/useLocale';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createProductSubCategoryTableColumns from '../../config/product-subcategory/create-product-subcategory-table-columns';
import createProductSubcategoryAddFormFields from '../../config/product-subcategory/create-product-subcategory-add-formfields';
import createProductSubcategoryEditFormFields from '../../config/product-subcategory/create-product-subcategory-edit-formfields';
import createProductSubcategoryQueryFields from '../../config/product-subcategory/create-product-subcategory-queryfields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<ProductSubCategory>>> = React.lazy(() => import('@/features/CrudTable'))

const ProductSubcategories: React.FC = () => {
    const { translate } = useLocale();

    return (
        <CrudModule header title={'product-sub-category'} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="product-sub-category"
                    columns={createProductSubCategoryTableColumns(translate)}
                    dataSource={[]}
                    tableKey="brand-table"
                    rowKey="id"
                    loadRelations={['category']}
                    processDataForUpdateForm={(data) => ({
                        ...data,
                        category: data?.category?.id ?? null, // Only specific logic here
                    })}
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
                    createFormFields={createProductSubcategoryAddFormFields()}
                    updateFormFields={createProductSubcategoryEditFormFields()}
                    queryFormFields={createProductSubcategoryQueryFields(translate)}
                />
            </Suspense>
        </CrudModule>
    )
}

export default ProductSubcategories;