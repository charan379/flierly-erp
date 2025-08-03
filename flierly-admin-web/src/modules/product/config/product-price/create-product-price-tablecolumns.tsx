import { createIdColumn } from "@/modules/core/utils/create-tablecolumn";
import { ProColumns } from "@ant-design/pro-components";

const createProductPriceTableColumns = (t: (v: string) => string): ProColumns<ProductPrice>[] => {
    return [
        // id
        createIdColumn(t),
        // price type 
        {
            title: t('product_price.type'),
            dataIndex: 'type',
            key: 'type',
            valueType: 'text',
            copyable: true,
            width: 180,
        },
        // productId
        {
            title: t('product.id'),
            dataIndex: 'productId',
            key: 'productId',
            valueType: 'text',
            copyable: true,
            width: 120,
        },
        // product
        {
            title: t('column.product'),
            dataIndex: 'product',
            key: 'product',
            valueType: 'text',
            copyable: true,
            width: 200,
            render: (_text, record) => {
                if (typeof record.product === 'object' && record.product !== null && 'name' in record.product) {
                    return record.product.name;
                }
                return null;
            },
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
            width: 120,
        },
        // effectiveDate
        {
            title: t('product_price.evfective_date'),
            dataIndex: 'effectiveDate',
            key: 'effectiveDate',
            valueType: 'date',
            copyable: true,
            width: 140,
        },
    ];
};

export default createProductPriceTableColumns;