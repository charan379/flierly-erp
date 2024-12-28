import PageLoader from '@/components/PageLoader';
import CrudModule from '@/features/CrudModule';
import { CrudTableProps } from '@/features/CrudTable/CrudTable';
import useLocale from '@/features/Locale/hooks/useLocale';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createProductSubCategoryTableColumns from '../../config/product-subcategory/create-product-subcategory-table-columns';
import productSubCategoryCreateFormFields from '../../config/product-subcategory/product-subcategory-create-form-fields';
import productSubCategoryUpdateFormFields from '../../config/product-subcategory/product-subcategory-update-form-fields';
import productSubCategoryQueryFormFields from '../../config/product-subcategory/product-subcategory-query-form-fields';

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
                    createFormFields={productSubCategoryCreateFormFields}
                    updateFormFields={productSubCategoryUpdateFormFields}
                    queryFormFields={productSubCategoryQueryFormFields}
                />
            </Suspense>
        </CrudModule>
    )
}

export default ProductSubcategories;