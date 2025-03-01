import pr from "@/modules/auth/utils/get-permission-regex.util";
import { DashboardOutlined } from "@ant-design/icons";
import { faAddressBook, faUsersLine, faTags, faChartBar, faRulerCombined, faExchangeAlt, faIdBadge, faMapLocationDot, faFingerprint, faUsersGear, faUserTag, faKey, faBoxArchive, faBoxOpen, faThList, faSitemap, faBoxesPacking, faBuildingColumns, faIndianRupeeSign, faMagnifyingGlassDollar, faBuilding, faRuler, faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type SiteMapItem = {
    id: string;
    name: string;
    icon: React.ReactNode;
    resourcePath?: string;
    keywords: string[];
    permission: RegExp;
    parentItemId?: string;
    isDisabled: boolean;
};


const createSiteMapItems = (t: (value: string) => string, hasPermission: (requiredPermissionRegex: RegExp) => boolean): SiteMapItem[] => {

    const menuIconStyle: React.CSSProperties = { fontSize: '18px' }
    const menuIconWrapperStyle: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', width: "25px", justifyContent: 'center' }

    const siteMapItems: SiteMapItem[] = [
        {
            id: 'dashboard',
            name: t('nav.dashboard'),
            isDisabled: false,
            keywords: ['home', 'dashboard', t('nav.dashboard')],
            permission: pr("*"),
            resourcePath: '/erp',
            icon: <span role="img" aria-label="dashboard" style={menuIconWrapperStyle}><DashboardOutlined style={menuIconStyle}></DashboardOutlined></span>,
        },
        {
            id: 'organization',
            name: t('nav.organization'),
            isDisabled: !hasPermission(pr("organization.*")),
            keywords: ['account', t('nav.organization')],
            permission: pr("organization.*"),
            resourcePath: '/erp/organization',
            icon: <span role="img" aria-label="organization" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faBuildingColumns} style={menuIconStyle} /></span>,
        },
        {
            id: 'branches',
            name: t('nav.branches'),
            isDisabled: !hasPermission(pr("branch.*")),
            icon: <span role="img" aria-label="branches" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faBuilding} style={menuIconStyle} /></span>,
            keywords: ['branches', t('nav.branches')],
            permission: pr("branch.*"),
            resourcePath: '/erp/organization/branches',
            parentItemId: 'organization'
        },
        {
            id: 'account',
            name: t('nav.account'),
            isDisabled: !hasPermission(pr("account.*")),
            keywords: ['account', t('nav.account')],
            permission: pr("account.*"),
            resourcePath: '/erp/account',
            icon: <span role="img" aria-label="account" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faAddressBook} style={menuIconStyle} /></span>,
        },
        {
            id: 'accounts',
            name: t('nav.accounts'),
            isDisabled: !hasPermission(pr("account.*")),
            icon: <span role="img" aria-label="accounts" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faUsersLine} style={menuIconStyle} /></span>,
            keywords: ['accounts', t('nav.accounts')],
            permission: pr("account.*"),
            resourcePath: '/erp/accounts',
            parentItemId: 'account'
        },
        {
            id: 'account-types',
            name: t('nav.account_types'),
            isDisabled: !hasPermission(pr("accountType.*")),
            icon: <span role="img" aria-label="account-types" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faTags} style={menuIconStyle} /></span>,
            keywords: ['account-types', t('nav.account_types')],
            permission: pr("accountType.*"),
            resourcePath: '/erp/account/account-types',
            parentItemId: 'account'
        },
        {
            id: 'account-subtypes',
            name: t('nav.account_subtypes'),
            isDisabled: !hasPermission(pr("accountSubtype.*")),
            icon: <span role="img" aria-label="account-subtypes" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faTags} style={menuIconStyle} /></span>,
            keywords: ['account-subtypes', t('nav.account_subtypes')],
            permission: pr("accountSubtype.*"),
            resourcePath: '/erp/account/account-subtypes',
            parentItemId: 'account'
        },
        {
            id: 'inventory',
            name: t('nav.inventory'),
            isDisabled: !hasPermission(pr('inventory.*')),
            icon: <span role="img" aria-label="inventory" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faBoxArchive} style={menuIconStyle} /></span>,
            keywords: ['inventory', t('nav.inventory')],
            permission: pr('inventory.*'),
            resourcePath: '/erp/inventory',
        },
        {
            id: 'inventories',
            name: t('nav.inventories'),
            isDisabled: !hasPermission(pr("inventory.read")),
            icon: <span role="img" aria-label="inventories" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faChartBar} style={menuIconStyle} /></span>,
            keywords: ['inventory', 'inventories', t('nav.inventories')],
            permission: pr("inventory.read"),
            resourcePath: '/erp/inventory/inventories',
            parentItemId: 'inventory'
        },
        {
            id: 'prodcut-stocks',
            name: t('nav.product_stocks'),
            isDisabled: !hasPermission(pr("productStock.*")),
            icon: <span role="img" aria-label="prodcut-stocks" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faChartBar} style={menuIconStyle} /></span>,
            keywords: ['stocks', t('nav.product_stocks')],
            permission: pr("productStock.*"),
            resourcePath: '/erp/inventory/prodcut-stocks',
            parentItemId: 'inventory'
        },
        {
            id: 'inventory-statistics',
            name: t('nav.inventory_statistics'),
            isDisabled: !hasPermission(pr("inventory.*")),
            icon: <span role="img" aria-label="inventory-statistics" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faPieChart} style={menuIconStyle} /></span>,
            keywords: ['statistics', "inventory", t('nav.inventory_statistics')],
            permission: pr("inventory.*"),
            resourcePath: '/erp/inventory/statistics',
            parentItemId: 'inventory'
        },
        {
            id: 'uom',
            name: t('nav.uom'),
            isDisabled: !hasPermission(pr("uom.*")),
            icon: <span role="img" aria-label="uom" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faRulerCombined} style={menuIconStyle} /></span>,
            keywords: ['uom', t('nav.uom')],
            permission: pr("uom.*"),
        },
        {
            id: 'uoms',
            name: t('nav.uoms'),
            isDisabled: !hasPermission(pr("uom.*")),
            icon: <span role="img" aria-label="uoms" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faRuler} style={menuIconStyle} /></span>,
            keywords: ['uoms', t('nav.uoms')],
            permission: pr("uom.*"),
            resourcePath: '/erp/uom/uoms',
            parentItemId: 'uom'
        },
        {
            id: 'uom-conversions',
            name: t('nav.uom_conversions'),
            isDisabled: !hasPermission(pr('uomConversion.*')),
            icon: <span role="img" aria-label="uom-conversions" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faExchangeAlt} style={menuIconStyle} /></span>,
            keywords: ['uom-conversions', t('nav.uom_conversions'), "conversions", "uom"],
            permission: pr("uomConversion.*"),
            resourcePath: '/erp/uom/uom-conversions',
            parentItemId: 'uom'
        },
        {
            id: 'product',
            name: t('nav.product'),
            isDisabled: !hasPermission(pr("product.*")),
            icon: <span role="img" aria-label="product" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faBoxesPacking} style={menuIconStyle} /></span>,
            keywords: ['product', t('nav.product')],
            permission: pr('product.*'),
            resourcePath: '/erp/product',
        },
        {
            id: 'products',
            name: t('nav.products'),
            isDisabled: !hasPermission(pr("product.*")),
            icon: <span role="img" aria-label="products" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faTags} style={menuIconStyle} /></span>,
            keywords: ['products', t('nav.products')],
            permission: pr("product.*"),
            resourcePath: '/erp/product/products',
            parentItemId: 'product'
        },
        {
            id: 'product-prices',
            name: t('nav.product_prices'),
            isDisabled: !hasPermission(pr("productPrice.*")),
            icon: <span role="img" aria-label="product-prices" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faIndianRupeeSign} style={menuIconStyle} /></span>,
            keywords: ['products', "product_prices", "prices", t('nav.product_prices')],
            permission: pr("productPrice.*"),
            resourcePath: '/erp/product/product-prices',
            parentItemId: 'product'
        },
        {
            id: 'product-lastest-prices-view',
            name: t('nav.product_latest_prices_view'),
            isDisabled: !hasPermission(pr("productLatestPricesView")),
            icon: <span role="img" aria-label="product-lastest-prices-view" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faMagnifyingGlassDollar} style={menuIconStyle} /></span>,
            keywords: ['products', "product_latest_prices_view", "latest", "prices", t('nav.product_latest_prices_view')],
            permission: pr("productPrice.*"),
            resourcePath: '/erp/product/product-latest-prices',
            parentItemId: 'product'
        },
        {
            id: 'product-availability-view',
            name: t('nav.product_availability_view'),
            isDisabled: !hasPermission(pr("productAvailabilityView")),
            icon: <span role="img" aria-label="product-availability-view" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faMagnifyingGlassDollar} style={menuIconStyle} /></span>,
            keywords: ['products', "product_availability_view", t('nav.product_availability_view')],
            permission: pr("productAvailabilityView"),
            resourcePath: '/erp/product/product-availability',
            parentItemId: 'product'
        },
        {
            id: 'tags-metadata',
            name: t('nav.tags_metadata'),
            isDisabled: !hasPermission(pr("tagMetadata.*")),
            icon: <span role="img" aria-label="tags-metadata" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faTags} style={menuIconStyle} /></span>,
            keywords: ['tags-metadata', t('nav.tags_metadata')],
            permission: pr("tagMetadata.*"),
            resourcePath: '/erp/product/tags-metadata',
            parentItemId: 'product'
        },
        {
            id: 'brands',
            name: t('nav.brands'),
            isDisabled: !hasPermission(pr("brand.*")),
            icon: <span role="img" aria-label="brands" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faBoxOpen} style={menuIconStyle} /></span>,
            keywords: ['brands', t('nav.brands'), t('nav.products')],
            permission: pr("brand.*"),
            resourcePath: '/erp/product/brands',
            parentItemId: 'product'
        },
        {
            id: 'categories',
            name: t('nav.product_categories'),
            isDisabled: !hasPermission(pr("productCategory.*")),
            icon: <span role="img" aria-label="categories" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faThList} style={menuIconStyle} /></span>,
            keywords: ['categories', t('nav.product_categories'), t('nav.products')],
            permission: pr("productCategory.*"),
            resourcePath: '/erp/product/categories',
            parentItemId: 'product'
        },
        {
            id: 'sub-categories',
            name: t('nav.sub_categories'),
            isDisabled: !hasPermission(pr("productSubCategory.*")),
            icon: <span role="img" aria-label="sub-categories" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faSitemap} style={menuIconStyle} /></span>,
            keywords: ['sub-categories', t('nav.sub_categories'), t('nav.products')],
            permission: pr("productSubCategory.*"),
            resourcePath: '/erp/product/sub-categories',
            parentItemId: 'product'
        },
        {
            id: 'tax-identities',
            name: t('nav.tax_identites'),
            isDisabled: !hasPermission(pr("taxIdentity.*")),
            icon: <span role="img" aria-label="tax-identities" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faIdBadge} style={menuIconStyle} /></span>,
            keywords: ['tax-identities', t('nav.tax_identites')],
            permission: pr("taxIdentity.*"),
            resourcePath: '/erp/taxation/tax-identities',
        },
        {
            id: 'addresses',
            name: t('nav.addresses'),
            isDisabled: !hasPermission(pr('address.*')),
            icon: <span role="img" aria-label="addresses" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faMapLocationDot} style={menuIconStyle} /></span>,
            keywords: ['addresses', t('nav.addresses')],
            permission: pr("address.*"),
            resourcePath: '/erp/address/addresses',
        },
        {
            id: 'iam',
            name: t('nav.iam_dashboard'),
            isDisabled: !hasPermission(pr("iam")),
            icon: <span role="img" aria-label="iam" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faFingerprint} style={menuIconStyle} /></span>,
            keywords: ['iam dashboard', t('iam_dashboard')],
            permission: pr("iam"),
            // resourcePath: '/erp/iam',
        },
        {
            id: 'users',
            name: t('nav.users'),
            isDisabled: !hasPermission(pr("user.*")),
            icon: <span role="img" aria-label="users" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faUsersGear} style={menuIconStyle} /></span>,
            keywords: ['users', t('nav.users'), t('nav.iam')],
            permission: pr("user.*"),
            resourcePath: '/erp/iam/users',
            parentItemId: 'iam'
        },
        {
            id: 'roles',
            name: t('nav.roles'),
            isDisabled: !hasPermission(pr("role.*")),
            icon: <span role="img" aria-label="roles" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faUserTag} style={menuIconStyle} /></span>,
            keywords: ['roles', t('nav.roles'), t('nav.iam')],
            permission: pr("role.*"),
            resourcePath: '/erp/iam/roles',
            parentItemId: 'iam'
        },
        {
            id: 'privileges',
            name: t('nav.privileges'),
            isDisabled: !hasPermission(pr("privilege.*")),
            icon: <span role="img" aria-label="privileges" style={menuIconWrapperStyle}><FontAwesomeIcon icon={faKey} style={menuIconStyle} /></span>,
            keywords: ['privileges', t('nav.privileges'), t("nav.iam")],
            permission: pr("privilege.*"),
            resourcePath: '/erp/iam/privileges',
            parentItemId: 'iam'
        },

    ]

    return siteMapItems;
}

export default createSiteMapItems;