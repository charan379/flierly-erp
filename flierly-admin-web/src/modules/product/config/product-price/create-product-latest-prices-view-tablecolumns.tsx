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
        // price type 
        {
            title: t('product_price.type'),
            dataIndex: 'priceType',
            key: 'priceType',
            valueType: 'text',
            copyable: true,
            width: 120,
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
        // price
        {
            title: t('product_price.price'),
            dataIndex: 'price',
            key: 'price',
            valueType: {
                type: "money",
                moneySymbol: false,
                showSymbol: true,
                locale: "en-Us",
            },
            copyable: true,
            width: 140,
        },
        // effectiveDate
        {
            title: t('product_price.evfective_date'),
            dataIndex: 'effectiveDate',
            key: 'effectiveDate',
            valueType: 'date',
            copyable: true,
            width: 180,
            sorter: true,
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
            width: 80,
        },
        // hsn 
        {
            title: t('product.hsn'),
            dataIndex: 'hsn',
            key: 'hsn',
            valueType: 'text',
            copyable: true,
            width: 80,
        },
    ];
};

export default createProductLatestPricesViewTableColumns;