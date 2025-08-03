import PageLoader from '@/modules/core/components/PageLoader';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import CrudModule from '@/modules/core/features/CrudModule';
import createProductAvailabilityViewTableColumns from '../../config/product-stock/create-product-availabilty-view-tablecolumns';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<ProductAvailabilityView>>> = React.lazy(() => import('@/modules/core/features/CrudTable'));

const ProductAvailabilityViewPage: React.FC = () => {
    const { translate: t } = useLocale();

    return (
        <CrudModule header title={t("title.product_availability")} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="product-availability-view"
                    columns={createProductAvailabilityViewTableColumns(t)}
                    loadRelations={[]}
                    dataSource={[]}
                    tableKey="product-availability-view-table"
                    rowKey="stockId"
                    filterRowsWithBranchId
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

export default ProductAvailabilityViewPage;