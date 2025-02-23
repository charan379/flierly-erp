import { createBooleanColumn } from "@/modules/core/utils/create-tablecolumn";
import { ProColumns } from "@ant-design/pro-components";

const createProductLatestPricesViewTableColumns = (t: (v: string) => string): ProColumns<ProductLatestPricesView>[] => {
    return [
        // productId
        {
            title: t('product.id'),
            dataIndex: 'productId',
            key: 'productId',
            valueType: 'text',
            copyable: true,
            width: 120,
            sorter: true,
        },
        // product name
        {
            title: t('product.name'),
            dataIndex: 'productName',
            key: 'productName',
            valueType: 'text',
            copyable: true,
            width: 160,
        },
        // salePrice
        {
            title: t('product_price.salePrice'),
            dataIndex: 'salePrice',
            key: 'salePrice',
            valueType: {
                type: "money",
                moneySymbol: false,
                showSymbol: true,
                locale: "en-Us",
            },
            copyable: true,
            width: 160,
        },
        // maximumSalePrice
        {
            title: t('product_price.maximumSalePrice'),
            dataIndex: 'maximumSalePrice',
            key: 'maximumSalePrice',
            valueType: {
                type: "money",
                moneySymbol: false,
                showSymbol: true,
                locale: "en-Us",
            },
            copyable: true,
            width: 220,
        },
        // minimunSalePrice
        {
            title: t('product_price.minimunSalePrice'),
            dataIndex: 'minimunSalePrice',
            key: 'minimunSalePrice',
            valueType: {
                type: "money",
                moneySymbol: false,
                showSymbol: true,
                locale: "en-Us",
            },
            copyable: true,
            width: 200,
        },
        // purchasePrice
        {
            title: t('product_price.purchasePrice'),
            dataIndex: 'purchasePrice',
            key: 'purchasePrice',
            valueType: {
                type: "money",
                moneySymbol: false,
                showSymbol: true,
                locale: "en-Us",
            },
            copyable: true,
            width: 180,
        },
        // maximumPurchasePrice
        {
            title: t('product_price.maximumPurchasePrice'),
            dataIndex: 'maximumPurchasePrice',
            key: 'maximumPurchasePrice',
            valueType: {
                type: "money",
                moneySymbol: false,
                showSymbol: true,
                locale: "en-Us",
            },
            copyable: true,
            width: 240,
        },
        createBooleanColumn(t, { dataIndex: "isSerialized", title: t('product.is_serialized'), width: 140 }),
        createBooleanColumn(t, { dataIndex: "isComposite", title: t('product.is_composite'), width: 140 }),
        // sku 
        {
            title: t('product.sku'),
            dataIndex: 'sku',
            key: 'sku',
            valueType: 'text',
            copyable: true,
            width: 90,
        },
        // hsn 
        {
            title: t('product.hsn'),
            dataIndex: 'hsn',
            key: 'hsn',
            valueType: 'text',
            copyable: true,
            width: 90,
        },
    ];
};

export default createProductLatestPricesViewTableColumns;