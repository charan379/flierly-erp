import PageLoader from '@/modules/core/components/PageLoader';
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import { Form } from 'antd';
import { CrudTableProps } from '@/modules/core/features/CrudTable/CrudTable';
import useLocale from '@/modules/core/features/Locale/hooks/useLocale';
import CrudModule from '@/modules/core/features/CrudModule';
import createProductPriceTableColumns from '../../config/product-price/create-product-price-tablecolumns';
import ProductPriceFormFields from '../../form-fields/ProductPriceFormFields';

const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<ProductPrice>>> = React.lazy(() => import('@/modules/core/features/CrudTable'));

const ProductPricePage: React.FC = () => {
    const { translate: t } = useLocale();
    const [addFormInstance] = Form.useForm<ProductPrice>();

    return (
        <CrudModule header title={t("title.product_prices")} menuKeys={['product']}>
            <Suspense fallback={<PageLoader />}>
                <CrudTable
                    entity="product-price"
                    columns={createProductPriceTableColumns(t)}
                    loadRelations={["product"]}
                    dataSource={[]}
                    tableKey="product-price-table"
                    rowKey="id"
                    disableContextMenuItems={["activate", "delete", "restore", "inactivate", "edit"]}
                    render={{
                        activate: false,
                        bin: false,
                        clear: true,
                        create: true,
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
                    addFormProps={{
                        formFields: <ProductPriceFormFields formInstance={addFormInstance} />,
                        formInstance: addFormInstance
                    }}
                />
            </Suspense>
        </CrudModule>
    )
}

export default ProductPricePage;