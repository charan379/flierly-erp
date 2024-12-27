import { DashboardOutlined } from "@ant-design/icons";
import { faAddressBook, faUsersLine, faTags, faChartBar, faRulerCombined, faExchangeAlt, faIdBadge, faMapLocationDot, faFingerprint, faUsersGear, faUserTag, faKey, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
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


const createSiteMapItems = (translate: (value: string) => string, hasPermission: (requiredPermissionRegex: RegExp) => boolean): SiteMapItem[] => {

    const menuIconStyle: React.CSSProperties = { fontSize: '16px' }


    const siteMapItems: SiteMapItem[] = [
        {
            id: 'dashboard',
            name: translate('dashboard'),
            isDisabled: false,
            keywords: ['home', 'dashboard', translate('dashboard')],
            permission: /.*/,
            resourcePath: '/erp',
            icon: <DashboardOutlined style={menuIconStyle}></DashboardOutlined>
        },
        {
            id: 'account',
            name: translate('account'),
            isDisabled: !hasPermission(/^account(-[a-z]+)?\.[a-z]+$/),
            keywords: ['account', translate('account')],
            permission: /^account(-[a-z]+)?\.[a-z]+$/,
            resourcePath: '/erp/account',
            icon: <FontAwesomeIcon icon={faAddressBook} style={menuIconStyle} />,
        },
        {
            id: 'accounts',
            name: translate('accounts'),
            isDisabled: !hasPermission(/^account(-[a-z]+)?\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faUsersLine} style={menuIconStyle} />,
            keywords: ['accounts', translate('accounts')],
            permission: /^account(-[a-z]+)?\.[a-z]+$/,
            resourcePath: '/erp/accounts',
            parentItemId: 'account'
        },
        {
            id: 'account-types',
            name: translate('account-types'),
            isDisabled: !hasPermission(/^account-type\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
            keywords: ['account-types', translate('account-types')],
            permission: /^account-type\.[a-z]+$/,
            resourcePath: '/erp/account/account-types',
            parentItemId: 'account'
        },
        {
            id: 'account-subtypes',
            name: translate('account-subtypes'),
            isDisabled: !hasPermission(/^account-subtype\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
            keywords: ['account-subtypes', translate('account-subtypes')],
            permission: /^account-subtype\.[a-z]+$/,
            resourcePath: '/erp/account/account-subtypes',
            parentItemId: 'account'
        },
        {
            id: 'inventory',
            name: translate('inventory'),
            isDisabled: !hasPermission(/^product(-[a-z]+)?\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faBoxArchive} style={menuIconStyle} />,
            keywords: ['inventory', translate('inventory')],
            permission: /^product(-[a-z]+)?\.[a-z]+$/,
            resourcePath: '/erp/inventory',
        },
        {
            id: 'products',
            name: translate('products'),
            isDisabled: !hasPermission(/^product\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
            keywords: ['products', translate('products')],
            permission: /^product\.[a-z]+$/,
            resourcePath: '/erp/inventory/products',
            parentItemId: 'inventory'
        },
        {
            id: 'stocks',
            name: translate('stocks'),
            isDisabled: !hasPermission(/^stock\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faChartBar} style={menuIconStyle} />,
            keywords: ['stocks', translate('stocks')],
            permission: /^stock\.[a-z]+$/,
            resourcePath: '/erp/inventory/stocks',
            parentItemId: 'inventory'
        },
        {
            id: 'uoms',
            name: translate('uoms'),
            isDisabled: !hasPermission(/^uom\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faRulerCombined} style={menuIconStyle} />,
            keywords: ['uoms', translate('uoms')],
            permission: /^uom\.[a-z]+$/,
            resourcePath: '/erp/inventory/uoms',
            parentItemId: 'inventory'
        },
        {
            id: 'uom-conversions',
            name: translate('uom-conversions'),
            isDisabled: !hasPermission(/^uom-conversion\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faExchangeAlt} style={menuIconStyle} />,
            keywords: ['uom-conversions', translate('uom-conversions')],
            permission: /^uom-conversion\.[a-z]+$/,
            resourcePath: '/erp/inventory/uom-conversions',
            parentItemId: 'inventory'
        },
        {
            id: 'tax-identities',
            name: translate('tax-identites'),
            isDisabled: !hasPermission(/^tax-identity\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faIdBadge} style={menuIconStyle} />,
            keywords: ['tax-identities', translate('tax-identites')],
            permission: /^tax-identity\.[a-z]+$/,
            resourcePath: '/erp/taxation/tax-identities',
        },
        {
            id: 'addresses',
            name: translate('addresses'),
            isDisabled: !hasPermission(/^address\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faMapLocationDot} style={menuIconStyle} />,
            keywords: ['addresses', translate('addresses')],
            permission: /^address\.[a-z]+$/,
            resourcePath: '/erp/address/addresses',
        },
        {
            id: 'iam',
            name: translate('iam'),
            isDisabled: !hasPermission(/^user\.read$/),
            icon: <FontAwesomeIcon icon={faFingerprint} style={menuIconStyle} />,
            keywords: ['iam dashboard', translate('iam_dashboard')],
            permission: /^user\.read$/,
            resourcePath: '/erp/iam',
        },
        {
            id: 'users',
            name: translate('users'),
            isDisabled: !hasPermission(/^user\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faUsersGear} style={menuIconStyle} />,
            keywords: ['users', translate('users')],
            permission: /^user\.[a-z]+$/,
            resourcePath: '/erp/iam/users',
            parentItemId: 'iam'
        },
        {
            id: 'roles',
            name: translate('roles'),
            isDisabled: !hasPermission(/^role\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faUserTag} style={menuIconStyle} />,
            keywords: ['roles', translate('roles')],
            permission: /^role\.[a-z]+$/,
            resourcePath: '/erp/iam/roles',
            parentItemId: 'iam'
        },
        {
            id: 'privileges',
            name: translate('privileges'),
            isDisabled: !hasPermission(/^privilege\.[a-z]+$/),
            icon: <FontAwesomeIcon icon={faKey} style={menuIconStyle} />,
            keywords: ['privileges', translate('privileges')],
            permission: /^privilege\.[a-z]+$/,
            resourcePath: '/erp/iam/privileges',
            parentItemId: 'iam'
        },
    ]

    return siteMapItems;
}

export default createSiteMapItems;