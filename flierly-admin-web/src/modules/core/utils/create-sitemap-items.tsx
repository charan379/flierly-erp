import pr from "@/modules/auth/utils/get-permission-regex.util";
import { DashboardOutlined } from "@ant-design/icons";
import { faAddressBook, faUsersLine, faTags, faChartBar, faRulerCombined, faExchangeAlt, faIdBadge, faMapLocationDot, faFingerprint, faUsersGear, faUserTag, faKey, faBoxArchive, faBoxOpen, faThList, faSitemap, faBoxesPacking } from "@fortawesome/free-solid-svg-icons";
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

    const menuIconStyle: React.CSSProperties = { fontSize: '16px' }


    const siteMapItems: SiteMapItem[] = [
        {
            id: 'dashboard',
            name: t('nav.dashboard'),
            isDisabled: false,
            keywords: ['home', 'dashboard', t('nav.dashboard')],
            permission: pr("*"),
            resourcePath: '/erp',
            icon: <DashboardOutlined style={menuIconStyle}></DashboardOutlined>
        },
        {
            id: 'account',
            name: t('nav.account'),
            isDisabled: !hasPermission(pr("account.*")),
            keywords: ['account', t('nav.account')],
            permission: pr("account.*"),
            resourcePath: '/erp/account',
            icon: <FontAwesomeIcon icon={faAddressBook} style={menuIconStyle} />,
        },
        {
            id: 'accounts',
            name: t('nav.accounts'),
            isDisabled: !hasPermission(pr("account.*")),
            icon: <FontAwesomeIcon icon={faUsersLine} style={menuIconStyle} />,
            keywords: ['accounts', t('nav.accounts')],
            permission: pr("account.*"),
            resourcePath: '/erp/accounts',
            parentItemId: 'account'
        },
        {
            id: 'account-types',
            name: t('nav.account_types'),
            isDisabled: !hasPermission(pr("accountType.*")),
            icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
            keywords: ['account-types', t('nav.account_types')],
            permission: pr("accountType.*"),
            resourcePath: '/erp/account/account-types',
            parentItemId: 'account'
        },
        {
            id: 'account-subtypes',
            name: t('nav.account_subtypes'),
            isDisabled: !hasPermission(pr("accountSubtype.*")),
            icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
            keywords: ['account-subtypes', t('nav.account_subtypes')],
            permission: pr("accountSubtype.*"),
            resourcePath: '/erp/account/account-subtypes',
            parentItemId: 'account'
        },
        {
            id: 'inventory',
            name: t('nav.inventory'),
            isDisabled: !hasPermission(pr('inventory.*')),
            icon: <FontAwesomeIcon icon={faBoxArchive} style={menuIconStyle} />,
            keywords: ['inventory', t('nav.inventory')],
            permission: pr('inventory.*'),
            resourcePath: '/erp/inventory',
        },
        {
            id: 'inventories',
            name: t('nav.inventories'),
            isDisabled: !hasPermission(pr("inventory.read")),
            icon: <FontAwesomeIcon icon={faChartBar} style={menuIconStyle} />,
            keywords: ['inventory','inventories', t('nav.inventories')],
            permission: pr("inventory.read"),
            resourcePath: '/erp/inventory/inventories',
            parentItemId: 'inventory'
        },
        {
            id: 'prodcut-stocks',
            name: t('nav.product_stocks'),
            isDisabled: !hasPermission(pr("productStock.*")),
            icon: <FontAwesomeIcon icon={faChartBar} style={menuIconStyle} />,
            keywords: ['stocks', t('nav.product_stocks')],
            permission: pr("productStock.*"),
            resourcePath: '/erp/inventory/prodcut-stocks',
            parentItemId: 'inventory'
        },
        {
            id: 'uoms',
            name: t('nav.uoms'),
            isDisabled: !hasPermission(pr("uom.*")),
            icon: <FontAwesomeIcon icon={faRulerCombined} style={menuIconStyle} />,
            keywords: ['uoms', t('nav.uoms')],
            permission: pr("uom.*"),
            resourcePath: '/erp/inventory/uoms',
            parentItemId: 'inventory'
        },
        {
            id: 'uom-conversions',
            name: t('nav.uom_conversions'),
            isDisabled: !hasPermission(pr('uomConversion.*')),
            icon: <FontAwesomeIcon icon={faExchangeAlt} style={menuIconStyle} />,
            keywords: ['uom-conversions', t('nav.uom_conversions'), "conversions", "uom"],
            permission: pr("uomConversion.*"),
            resourcePath: '/erp/inventory/uom-conversions',
            parentItemId: 'inventory'
        },
        {
            id: 'product',
            name: t('nav.product'),
            isDisabled: !hasPermission(pr("product.*")),
            icon: <FontAwesomeIcon icon={faBoxesPacking} style={menuIconStyle} />,
            keywords: ['product', t('nav.product')],
            permission: pr('product.*'),
            resourcePath: '/erp/product',
        },
        {
            id: 'products',
            name: t('nav.products'),
            isDisabled: !hasPermission(pr("product.*")),
            icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
            keywords: ['products', t('nav.products')],
            permission: pr("product.*"),
            resourcePath: '/erp/product/products',
            parentItemId: 'product'
        },
        {
            id: 'tags-metadata',
            name: t('nav.tags_metadata'),
            isDisabled: !hasPermission(pr("tagMetadata.*")),
            icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
            keywords: ['tags-metadata', t('nav.tags_metadata')],
            permission: pr("tagMetadata.*"),
            resourcePath: '/erp/product/tags-metadata',
            parentItemId: 'product'
        },
        {
            id: 'brands',
            name: t('nav.brands'),
            isDisabled: !hasPermission(pr("brand.*")),
            icon: <FontAwesomeIcon icon={faBoxOpen} style={menuIconStyle} />,
            keywords: ['brands', t('nav.brands'), t('nav.products')],
            permission: pr("brand.*"),
            resourcePath: '/erp/product/brands',
            parentItemId: 'product'
        },
        {
            id: 'categories',
            name: t('nav.product_categories'),
            isDisabled: !hasPermission(pr("productCategory.*")),
            icon: <FontAwesomeIcon icon={faThList} style={menuIconStyle} />,
            keywords: ['categories', t('nav.product_categories'), t('nav.products')],
            permission: pr("productCategory.*"),
            resourcePath: '/erp/product/categories',
            parentItemId: 'product'
        },
        {
            id: 'sub-categories',
            name: t('nav.sub_categories'),
            isDisabled: !hasPermission(pr("productSubCategory.*")),
            icon: <FontAwesomeIcon icon={faSitemap} style={menuIconStyle} />,
            keywords: ['sub-categories', t('nav.sub_categories'), t('nav.products')],
            permission: pr("productSubCategory.*"),
            resourcePath: '/erp/product/sub-categories',
            parentItemId: 'product'
        },
        {
            id: 'tax-identities',
            name: t('nav.tax_identites'),
            isDisabled: !hasPermission(pr("taxIdentity.*")),
            icon: <FontAwesomeIcon icon={faIdBadge} style={menuIconStyle} />,
            keywords: ['tax-identities', t('nav.tax_identites')],
            permission: pr("taxIdentity.*"),
            resourcePath: '/erp/taxation/tax-identities',
        },
        {
            id: 'addresses',
            name: t('nav.addresses'),
            isDisabled: !hasPermission(pr('address.*')),
            icon: <FontAwesomeIcon icon={faMapLocationDot} style={menuIconStyle} />,
            keywords: ['addresses', t('nav.addresses')],
            permission: pr("address.*"),
            resourcePath: '/erp/address/addresses',
        },
        {
            id: 'iam',
            name: t('nav.iam_dashboard'),
            isDisabled: !hasPermission(pr("iam")),
            icon: <FontAwesomeIcon icon={faFingerprint} style={menuIconStyle} />,
            keywords: ['iam dashboard', t('iam_dashboard')],
            permission: pr("iam"),
            resourcePath: '/erp/iam',
        },
        {
            id: 'users',
            name: t('nav.users'),
            isDisabled: !hasPermission(pr("user.*")),
            icon: <FontAwesomeIcon icon={faUsersGear} style={menuIconStyle} />,
            keywords: ['users', t('nav.users'), t('nav.iam')],
            permission: pr("user.*"),
            resourcePath: '/erp/iam/users',
            parentItemId: 'iam'
        },
        {
            id: 'roles',
            name: t('nav.roles'),
            isDisabled: !hasPermission(pr("role.*")),
            icon: <FontAwesomeIcon icon={faUserTag} style={menuIconStyle} />,
            keywords: ['roles', t('nav.roles'), t('nav.iam')],
            permission: pr("role.*"),
            resourcePath: '/erp/iam/roles',
            parentItemId: 'iam'
        },
        {
            id: 'privileges',
            name: t('nav.privileges'),
            isDisabled: !hasPermission(pr("privilege.*")),
            icon: <FontAwesomeIcon icon={faKey} style={menuIconStyle} />,
            keywords: ['privileges', t('nav.privileges'), t("nav.iam")],
            permission: pr("privilege.*"),
            resourcePath: '/erp/iam/privileges',
            parentItemId: 'iam'
        },

    ]

    return siteMapItems;
}

export default createSiteMapItems;