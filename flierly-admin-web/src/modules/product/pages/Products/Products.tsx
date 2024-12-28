import PageLoader from '@/components/PageLoader';
import CrudModule from '@/features/CrudModule';
import { CrudTableProps } from '@/features/CrudTable/CrudTable';
import useLocale from '@/features/Locale/hooks/useLocale';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createProductTableColumns from '../../config/product/create-product-table-columns';
import productCreateFormFields from '../../config/product/product-create-form-fields';
import productUpdateFormFields from '../../config/product/product-update-form-fields';
import productQueryFormFields from '../../config/product/product-query-form-fields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Product>>> = React.lazy(() => import('@/features/CrudTable'))

const Products: React.FC = () => {
    const { translate } = useLocale();

    return (
        <CrudModule header title={'products'} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="product"
                    columns={createProductTableColumns(translate)}
                    dataSource={[]}
                    tableKey="product-table"
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
                    createFormFields={productCreateFormFields}
                    updateFormFields={productUpdateFormFields}
                    queryFormFields={productQueryFormFields}
                />
            </Suspense>
        </CrudModule>
    )
}

export default Products;