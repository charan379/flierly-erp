import useLocale from '@/features/Locale/hooks/useLocale'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import {
  AreaChartOutlined,
  CalculatorOutlined,
  ClusterOutlined,
  ContainerOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  FileOutlined,
  FileSyncOutlined,
  FilterOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  ShopOutlined,
  TableOutlined,
  TagsOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBoxArchive,
  faChartBar,
  faExchangeAlt,
  faFingerprint,
  faIdBadge,
  faKey,
  faMapLocationDot,
  faRulerCombined,
  faTags,
  faUsersGear,
  faUsersLine,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons'
import { faAddressBook as faAddressBookRegular } from '@fortawesome/free-regular-svg-icons'
import React from 'react'

export type NavMenuItemType = {
  keywords?: string[]
  key: React.Key
  icon?: React.ReactNode
  label: React.ReactNode
  disabled?: boolean
  children?: NavMenuItemType[]
} & ItemType<MenuItemType>

// Must be called in a react component only
const getMenuItems = (): NavMenuItemType[] => {
  const { translate } = useLocale()

  const { hasPermission } = useAuth()

  const menuIconStyle: React.CSSProperties = { fontSize: '16px' }

  const getLinkStyle = (permissionRegex?: RegExp): React.CSSProperties => {
    if (permissionRegex) {
      return {
        color: 'inherit',
        pointerEvents: hasPermission(permissionRegex) ? 'all' : 'none',
      }
    }

    return {
      color: 'inherit',
    }
  }

  const items: NavMenuItemType[] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined style={menuIconStyle} />,
      label: <Link to={'/erp'}>{translate('dashboard')}</Link>,
      keywords: ['home', 'dashboard', translate('dashboard')],
    },
    {
      key: 'branch',
      icon: <ClusterOutlined style={menuIconStyle} />,
      label: translate('branchs'),
      disabled: !hasPermission(/^branch\./),
      keywords: ['branch', 'branchs', translate('branchs')],
      children: [
        {
          key: 'branchHome',
          icon: <AreaChartOutlined style={menuIconStyle} />,
          label: (
            <Link to={'/erp/branch'} style={getLinkStyle(/^branch\.read$/)}>
              {translate('statistics')}
            </Link>
          ),
          disabled: !hasPermission(/^branch\.read$/),
          keywords: ['statistics', translate('statistics')],
        },
        {
          key: 'branchlist',
          icon: <TableOutlined style={menuIconStyle} />,
          label: (
            <Link to={'/erp/branch/list'} style={getLinkStyle(/^branch\.read$/)}>
              {translate('list_branchs')}
            </Link>
          ),
          disabled: !hasPermission(/^branch\.read$/),
          keywords: ['list', 'branchs', translate('list_branchs')],
        },
      ],
    },
    {
      key: 'account',
      icon: <FontAwesomeIcon icon={faAddressBookRegular} style={menuIconStyle} />,
      label: (
        <Link to={'/erp/account'} style={getLinkStyle(/^account(\-[a-z]+)?\.[a-z]+$/)}>
          {translate('account')}
        </Link>
      ),
      disabled: !hasPermission(/^account(\-[a-z]+)?\.[a-z]+$/),
      keywords: ['account', translate('account')],
      children: [
        {
          key: 'accounts',
          icon: <FontAwesomeIcon icon={faUsersLine} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/account/accounts'} style={getLinkStyle(/^account\.[a-z]+$/)}>
              {translate('accounts')}
            </Link>
          ),
          disabled: !hasPermission(/^account\.[a-z]+$/),
          keywords: ['accounts', translate('accounts')],
        },
        {
          key: 'account-types',
          icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/account/account-types'} style={getLinkStyle(/^account-type\.[a-z]+$/)}>
              {translate('account-types')}
            </Link>
          ),
          disabled: !hasPermission(/^account-type\.[a-z]+$/),
          keywords: ['account-types', translate('account-types')],
        },
        {
          key: 'account-subtypes',
          icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/account/account-subtypes'} style={getLinkStyle(/^account-subtype\.[a-z]+$/)}>
              {translate('account-subtypes')}
            </Link>
          ),
          disabled: !hasPermission(/^account-subtype\.[a-z]+$/),
          keywords: ['account-subtypes', translate('account-subtypes')],
        },
      ],
    },
    {
      key: 'inventory',
      icon: <FontAwesomeIcon icon={faBoxArchive} style={menuIconStyle} />,
      label: (
        <Link to={'/erp/inventory'} style={getLinkStyle(/^product(\-[a-z]+)?\.[a-z]+$/)}>
          {translate('inventory')}
        </Link>
      ),
      disabled: !hasPermission(/^product(\-[a-z]+)?\.[a-z]+$/),
      keywords: ['inventory', translate('inventory')],
      children: [
        {
          key: 'products',
          icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/inventory/products'} style={getLinkStyle(/^product\.[a-z]+$/)}>
              {translate('products')}
            </Link>
          ),
          disabled: !hasPermission(/^product\.[a-z]+$/),
          keywords: ['products', translate('products')],
        },
        {
          key: 'stocks',
          icon: <FontAwesomeIcon icon={faChartBar} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/inventory/stocks'} style={getLinkStyle(/^stock\.[a-z]+$/)}>
              {translate('stocks')}
            </Link>
          ),
          disabled: !hasPermission(/^stock\.[a-z]+$/),
          keywords: ['stocks', translate('stocks')],
        },
        {
          key: 'uoms',
          icon: <FontAwesomeIcon icon={faRulerCombined} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/inventory/uoms'} style={getLinkStyle(/^uom\.[a-z]+$/)}>
              {translate('uoms')}
            </Link>
          ),
          disabled: !hasPermission(/^uom\.[a-z]+$/),
          keywords: ['uoms', translate('uoms')],
        },
        {
          key: 'uom-conversions',
          icon: <FontAwesomeIcon icon={faExchangeAlt} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/inventory/uom-conversions'} style={getLinkStyle(/^uom\-conversion\.[a-z]+$/)}>
              {translate('uom-conversions')}
            </Link>
          ),
          disabled: !hasPermission(/^uom\-conversion\.[a-z]+$/),
          keywords: ['uom-conversions', translate('uom-conversions')],
        },
      ],
    },
    {
      key: 'taxation',
      icon: <CalculatorOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/erp/taxation'} style={getLinkStyle(/^tax.*\.[a-z]+$/)}>
          {translate('taxation')}
        </Link>
      ),
      disabled: !hasPermission(/^tax.*\.[a-z]+$/),
      keywords: ['taxation', translate('taxation')],
      children: [
        {
          key: 'tax-identities',
          icon: <FontAwesomeIcon icon={faIdBadge} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/taxation/tax-identities'} style={getLinkStyle(/^tax-identity\.[a-z]+$/)}>
              {translate('tax-identites')}
            </Link>
          ),
          disabled: !hasPermission(/^tax-identity\.[a-z]+$/),
          keywords: ['tax-identities', translate('tax-identites')],
        },
      ],
    },
    {
      key: 'address',
      icon: <EnvironmentOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/erp/address'} style={getLinkStyle(/^address.*\.[a-z]+$/)}>
          {translate('address')}
        </Link>
      ),
      disabled: !hasPermission(/^address.*\.[a-z]+$/),
      keywords: ['address', translate('address')],
      children: [
        {
          key: 'addresses',
          icon: <FontAwesomeIcon icon={faMapLocationDot} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/address/addresses'} style={getLinkStyle(/^address\.[a-z]+$/)}>
              {translate('addresses')}
            </Link>
          ),
          disabled: !hasPermission(/^address\.[a-z]+$/),
          keywords: ['addresses', translate('addresses')],
        },
      ],
    },
    {
      key: 'customer',
      icon: <CustomerServiceOutlined style={menuIconStyle} />,
      label: translate('customers'),
      disabled: !hasPermission(/^customer\./),
      keywords: ['customers', translate('customers')],
      children: [
        {
          key: 'customerHome',
          icon: <AreaChartOutlined style={menuIconStyle} />,
          label: (
            <Link to={'/erp/customer'} style={getLinkStyle(/^customer\.read$/)}>
              {translate('statistics')}
            </Link>
          ),
          disabled: !hasPermission(/^customer\.read$/),
          keywords: ['statistics', translate('statistics')],
        },
        {
          key: 'customerlist',
          icon: <TableOutlined style={menuIconStyle} />,
          label: (
            <Link to={'/erp/customer/list'} style={getLinkStyle(/^customer\.read$/)}>
              {translate('list_customers')}
            </Link>
          ),
          disabled: !hasPermission(/^customer\.read$/),
          keywords: ['list', 'customers', translate('list_customers')],
        },
      ],
    },
    {
      key: 'people',
      icon: <UserOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/people'} style={getLinkStyle(/^people\.read$/)}>
          {translate('peoples')}
        </Link>
      ),
      disabled: !hasPermission(/^people\.read$/),
      keywords: ['peoples', translate('peoples')],
    },
    {
      key: 'company',
      icon: <ShopOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/company'} style={getLinkStyle(/^company\.read$/)}>
          {translate('companies')}
        </Link>
      ),
      disabled: !hasPermission(/^company\.read$/),
      keywords: ['companies', translate('companies')],
    },
    {
      key: 'lead',
      icon: <FilterOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/lead'} style={getLinkStyle(/^lead\.read$/)}>
          {translate('leads')}
        </Link>
      ),
      disabled: !hasPermission(/^lead\.read$/),
      keywords: ['leads', translate('leads')],
    },
    {
      key: 'offer',
      icon: <FileOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/offers'} style={getLinkStyle(/^offer\.read$/)}>
          {translate('offers')}
        </Link>
      ),
      disabled: !hasPermission(/^offer\.read$/),
      keywords: ['offers', translate('offers')],
    },
    {
      key: 'invoice',
      icon: <ContainerOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/invoice'} style={getLinkStyle(/^invoice\.read$/)}>
          {translate('invoices')}
        </Link>
      ),
      disabled: !hasPermission(/^invoice\.read$/),
      keywords: ['invoice', 'invoices', translate('invoices')],
    },
    {
      key: 'quote',
      icon: <FileSyncOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/quote'} style={getLinkStyle(/^quote\.read$/)}>
          {translate('proforma invoices')}
        </Link>
      ),
      disabled: !hasPermission(/^quote\.read$/),
      keywords: ['quote', 'proforma invoices', translate('proforma invoices')],
    },
    {
      key: 'payment',
      icon: <CreditCardOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/payment'} style={getLinkStyle(/^payment\.read$/)}>
          {translate('payments')}
        </Link>
      ),
      disabled: !hasPermission(/^payment\.read$/),
      keywords: ['payment', 'payments', translate('payments')],
    },
    {
      key: 'categoryproduct',
      icon: <TagsOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/category/product'} style={getLinkStyle(/^categoryproduct\.read$/)}>
          {translate('products_category')}
        </Link>
      ),
      disabled: !hasPermission(/^categoryproduct\.read$/),
      keywords: ['category', 'products_category', translate('products_category')],
    },
    {
      key: 'expenses',
      icon: <WalletOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/expenses'} style={getLinkStyle(/^expenses\.read$/)}>
          {translate('expenses')}
        </Link>
      ),
      disabled: !hasPermission(/^expenses\.read$/),
      keywords: ['expenses', translate('expenses')],
    },
    {
      key: 'expensesCategory',
      icon: <ReconciliationOutlined style={menuIconStyle} />,
      label: (
        <Link to={'/category/expenses'} style={getLinkStyle(/^expensesCategory\.read$/)}>
          {translate('expenses_Category')}
        </Link>
      ),
      disabled: !hasPermission(/^expensesCategory\.read$/),
      keywords: ['expenses category', 'expenses_Category', translate('expenses_Category')],
    },
    {
      key: 'iam',
      icon: <FontAwesomeIcon icon={faFingerprint} style={menuIconStyle} />,
      label: translate('iam'),
      disabled: !hasPermission(/^user\.[a-z]+$/),
      keywords: ['iam', translate('iam')],
      children: [
        {
          key: 'iamHome',
          icon: <AreaChartOutlined style={menuIconStyle} />,
          label: (
            <Link to={'/erp/iam'} style={getLinkStyle(/^user\.[a-z]+$/)}>
              {translate('iam_dashboard')}
            </Link>
          ),
          disabled: !hasPermission(/^user\.read$/),
          keywords: ['iam dashboard', translate('iam_dashboard')],
        },
        {
          key: 'users',
          icon: <FontAwesomeIcon icon={faUsersGear} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/iam/users'} style={getLinkStyle(/^user\.[a-z]+$/)}>
              {translate('users')}
            </Link>
          ),
          disabled: !hasPermission(/^user\.[a-z]+$/),
          keywords: ['users', translate('users')],
        },
        {
          key: 'roles',
          icon: <FontAwesomeIcon icon={faUserTag} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/iam/roles'} style={getLinkStyle(/^role\.[a-z]+$/)}>
              {translate('roles')}
            </Link>
          ),
          disabled: !hasPermission(/^role\.[a-z]+$/),
          keywords: ['roles', translate('roles')],
        },
        {
          key: 'privileges',
          icon: <FontAwesomeIcon icon={faKey} style={menuIconStyle} />,
          label: (
            <Link to={'/erp/iam/privileges'} style={getLinkStyle(/^privilege\.[a-z]+$/)}>
              {translate('privileges')}
            </Link>
          ),
          disabled: !hasPermission(/^privilege\.[a-z]+$/),
          keywords: ['privileges', translate('privileges')],
        },
      ],
    },
    {
      label: translate('Settings'),
      key: 'settings',
      icon: <SettingOutlined style={menuIconStyle} />,
      disabled: !hasPermission(/^settings\.read$/),
      keywords: ['settings', translate('Settings')],
      children: [
        {
          key: 'generalSettings',
          icon: <ReconciliationOutlined style={menuIconStyle} />,
          label: (
            <Link to={'/settings'} style={getLinkStyle(/^settings\.read$/)}>
              {translate('settings')}
            </Link>
          ),
          disabled: !hasPermission(/^settings\.read$/),
          keywords: ['general settings', translate('settings')],
        },
        {
          key: 'paymentMode',
          label: (
            <Link to={'/payment/mode'} style={getLinkStyle(/^paymentMode\.read$/)}>
              {translate('payments_mode')}
            </Link>
          ),
          disabled: !hasPermission(/^paymentMode\.read$/),
          keywords: ['payment mode', translate('payments_mode')],
        },
        {
          key: 'taxes',
          label: (
            <Link to={'/taxes'} style={getLinkStyle(/^taxes\.read$/)}>
              {translate('taxes')}
            </Link>
          ),
          disabled: !hasPermission(/^taxes\.read$/),
          keywords: ['taxes', translate('taxes')],
        },
        {
          key: 'about',
          label: (
            <Link to={'/about'} style={getLinkStyle(/^about\.read$/)}>
              {translate('about')}
            </Link>
          ),
          disabled: !hasPermission(/^about\.read$/),
          keywords: ['about', translate('about')],
        },
      ],
    },
  ]

  return items
}

export default getMenuItems
