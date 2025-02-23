import { ProColumns } from "@ant-design/pro-components";

const createProductAvailabilityViewTableColumns = (t: (v: string) => string): ProColumns<ProductAvailabilityView>[] => {
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
        // productName
        {
            title: t('product.name'),
            dataIndex: 'productName',
            key: 'productName',
            valueType: 'text',
            copyable: true,
            width: 160,
        },
        // productType
        {
            title: t('product.type'),
            dataIndex: 'productType',
            key: 'productType',
            valueType: 'text',
            copyable: true,
            width: 120,
        },
        // categoryId
        {
            title: t('category.id'),
            dataIndex: 'categoryId',
            key: 'categoryId',
            valueType: 'text',
            copyable: true,
            width: 120,
        },
        // categoryName
        {
            title: t('category.name'),
            dataIndex: 'categoryName',
            key: 'categoryName',
            valueType: 'text',
            copyable: true,
            width: 160,
        },
        // subcategoryId
        {
            title: t('subcategory.id'),
            dataIndex: 'subcategoryId',
            key: 'subcategoryId',
            valueType: 'text',
            copyable: true,
            width: 120,
        },
        // subcategoryName
        {
            title: t('subcategory.name'),
            dataIndex: 'subcategoryName',
            key: 'subcategoryName',
            valueType: 'text',
            copyable: true,
            width: 160,
        },
        // stockId
        {
            title: t('stock.id'),
            dataIndex: 'stockId',
            key: 'stockId',
            valueType: 'text',
            copyable: true,
            width: 120,
        },
        // stockBalance
        {
            title: t('stock.balance'),
            dataIndex: 'stockBalance',
            key: 'stockBalance',
            valueType: 'digit',
            copyable: true,
            width: 120,
        },
        // inventoryId
        {
            title: t('inventory.id'),
            dataIndex: 'inventoryId',
            key: 'inventoryId',
            valueType: 'text',
            copyable: true,
            width: 120,
        },
        // inventoryType
        {
            title: t('inventory.type'),
            dataIndex: 'inventoryType',
            key: 'inventoryType',
            valueType: 'text',
            copyable: true,
            width: 160,
        },
        // branchId
        {
            title: t('branch.id'),
            dataIndex: 'branchId',
            key: 'branchId',
            valueType: 'text',
            copyable: true,
            width: 120,
        },
        // branchName
        {
            title: t('branch.name'),
            dataIndex: 'branchName',
            key: 'branchName',
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
    ];
};

export default createProductAvailabilityViewTableColumns;