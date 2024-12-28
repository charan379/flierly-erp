import PageLoader from '@/components/PageLoader';
import CrudModule from '@/features/CrudModule';
import { CrudTableProps } from '@/features/CrudTable/CrudTable';
import useLocale from '@/features/Locale/hooks/useLocale';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createProductCategoryTableColumns from '../../config/product-category/create-product-category-table-columns';
import productCategoryCreateFormFields from '../../config/product-category/product-category-create-form-fields';
import productCategoryQueryFormFields from '../../config/product-category/product-category-query-form-fields';
import productCategoryUpdateFormFields from '../../config/product-category/product-category-update-form-fields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<ProductCategory>>> = React.lazy(() => import('@/features/CrudTable'))

const ProductCategories: React.FC = () => {
    const { translate } = useLocale();

    return (
        <CrudModule header title={'product-categories'} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="product-category"
                    columns={createProductCategoryTableColumns(translate)}
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
                    createFormFields={productCategoryCreateFormFields}
                    updateFormFields={productCategoryUpdateFormFields}
                    queryFormFields={productCategoryQueryFormFields}
                />
            </Suspense>
        </CrudModule>
    )
}

export default ProductCategories;