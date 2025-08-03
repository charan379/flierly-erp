import PageLoader from '@/modules/core/components/PageLoader';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import CrudModule from '@/modules/core/features/CrudModule';
import createProductLatestPricesViewTableColumns from '../../config/product-price/create-product-latest-prices-view-tablecolumns';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<ProductLatestPricesView>>> = React.lazy(() => import('@/modules/core/features/CrudTable'));

const ProductLatestPricesViewPage: React.FC = () => {
    const { translate: t } = useLocale();

    return (
        <CrudModule header title={t("title.product_latest_prices")} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="product-latest-prices-view"
                    columns={createProductLatestPricesViewTableColumns(t)}
                    loadRelations={[]}
                    dataSource={[]}
                    tableKey="product-latest-prices-view-table"
                    rowKey="productId"
                    disableContextMenuItems={["activate", "delete", "restore", "inactivate", "edit"]}
                    render={{
                        activate: false,
                        bin: false,
                        clear: true,
                        create: false,
                        delete: false,
                        menu: true,
                        restore: false,
                        search: true,
                        update: false,
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
                />
            </Suspense>
        </CrudModule>
    )
}

export default ProductLatestPricesViewPage;