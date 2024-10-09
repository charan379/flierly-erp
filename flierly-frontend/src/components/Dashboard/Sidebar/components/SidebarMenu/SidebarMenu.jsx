import useTheme from "@/features/Theme/hooks/useTheme";
import useLocale from "@/features/Language/hooks/useLocale";
import { useAuth } from "@/modules/auth/hooks/useAuth";
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
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faChartBar, faExchangeAlt, faFingerprint, faIdBadge, faKey, faMapLocationDot, faRulerCombined, faTags, faUsersGear, faUsersLine, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook as faAddressBookRegular } from '@fortawesome/free-regular-svg-icons';
import filterEnabledItems from "@/utils/filterEnabledItems";

const SidebarMenu = () => {
  const { theme } = useTheme();
  const { translate } = useLocale();

  const { hasPermission } = useAuth();

  const menuIconStyle = { fontSize: "16px" };

  const getLinkStyle = (permissionRegex) => {
    return {
      pointerEvents: hasPermission(permissionRegex) ? 'all' : 'none',
    };
  };

  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined style={menuIconStyle} />,
      label: <Link to={"/erp"}>{translate("dashboard")}</Link>,
    },
    {
      key: "branch",
      icon: <ClusterOutlined style={menuIconStyle} />,
      label: translate("branchs"),
      disabled: !hasPermission(/^branch\./),
      children: [
        {
          key: "branchHome",
          icon: <AreaChartOutlined style={menuIconStyle} />,
          label: <Link to={"/erp/branch"} style={getLinkStyle(/^branch\.read$/)}>{translate("statistics")}</Link>,
          disabled: !hasPermission(/^branch\.read$/),
        },
        {
          key: "branchlist",
          icon: <TableOutlined style={menuIconStyle} />,
          label: <Link to={"/erp/branch/list"} style={getLinkStyle(/^branch\.read$/)}>{translate("list_branchs")}</Link>,
          disabled: !hasPermission(/^branch\.read$/),
        },
      ],
    },
    {
      key: "account",
      icon: <FontAwesomeIcon icon={faAddressBookRegular} style={menuIconStyle} />,
      label: <Link to={"/erp/account"} style={getLinkStyle(/^account(\-[a-z]+)?\.[a-z]+$/)}>{translate("account")}</Link>,
      disabled: !hasPermission(/^account(\-[a-z]+)?\.[a-z]+$/),
      children: [
        {
          key: "accounts",
          icon: <FontAwesomeIcon icon={faUsersLine} style={menuIconStyle} />,
          label: <Link to={"/erp/account/accounts"} style={getLinkStyle(/^account\.[a-z]+$/)}>{translate("accounts")}</Link>,
          disabled: !hasPermission(/^account\.[a-z]+$/),
        },
        {
          key: "account-types",
          icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
          label: <Link to={"/erp/account/account-types"} style={getLinkStyle(/^account-type\.[a-z]+$/)}>{translate("account-types")}</Link>,
          disabled: !hasPermission(/^account-type\.[a-z]+$/),
        },
        {
          key: "account-subtypes",
          icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
          label: <Link to={"/erp/account/account-subtypes"} style={getLinkStyle(/^account-subtype\.[a-z]+$/)}>{translate("account-subtypes")}</Link>,
          disabled: !hasPermission(/^account-subtype\.[a-z]+$/),
        },
      ],
    },
    {
      key: "inventory",
      icon: <FontAwesomeIcon icon={faBoxArchive} style={menuIconStyle} />,
      label: <Link to={"/erp/inventory"} style={getLinkStyle(/^product(\-[a-z]+)?\.[a-z]+$/)}>{translate("inventory")}</Link>,
      disabled: !hasPermission(/^product(\-[a-z]+)?\.[a-z]+$/),
      children: [
        {
          key: "products",
          icon: <FontAwesomeIcon icon={faTags} style={menuIconStyle} />,
          label: <Link to={"/erp/inventory/products"} style={getLinkStyle(/^product\.[a-z]+$/)}>{translate("products")}</Link>,
          disabled: !hasPermission(/^product\.[a-z]+$/),
        },
        {
          key: "stocks",
          icon: <FontAwesomeIcon icon={faChartBar} style={menuIconStyle} />,
          label: <Link to={"/erp/inventory/stocks"} style={getLinkStyle(/^stock\.[a-z]+$/)}>{translate("stocks")}</Link>,
          disabled: !hasPermission(/^stock\.[a-z]+$/),
        },
        {
          key: "uoms",
          icon: <FontAwesomeIcon icon={faRulerCombined} style={menuIconStyle} />,
          label: <Link to={"/erp/inventory/uoms"} style={getLinkStyle(/^uom\.[a-z]+$/)}>{translate("uoms")}</Link>,
          disabled: !hasPermission(/^uom\.[a-z]+$/),
        },
        {
          key: "uom-conversions",
          icon: <FontAwesomeIcon icon={faExchangeAlt} style={menuIconStyle} />,
          label: <Link to={"/erp/inventory/uom-conversions"} style={getLinkStyle(/^uom\-conversion\.[a-z]+$/)}>{translate("uom-conversions")}</Link>,
          disabled: !hasPermission(/^uom\-conversion\.[a-z]+$/),
        },
      ],
    },
    {
      key: "taxation",
      icon: <CalculatorOutlined style={menuIconStyle} />,
      label: <Link to={"/erp/taxation"} style={getLinkStyle(/^tax.*\.[a-z]+$/)}>{translate("taxation")}</Link>,
      disabled: !hasPermission(/^tax.*\.[a-z]+$/),
      children: [
        {
          key: "tax-identities",
          icon: <FontAwesomeIcon icon={faIdBadge} style={menuIconStyle} />,
          label: <Link to={"/erp/taxation/tax-identities"} style={getLinkStyle(/^tax-identity\.[a-z]+$/)}>{translate("tax-identites")}</Link>,
          disabled: !hasPermission(/^tax-identity\.[a-z]+$/),
        },
      ],
    },
    {
      key: "address",
      icon: <EnvironmentOutlined style={menuIconStyle} />,
      label: <Link to={"/erp/address"} style={getLinkStyle(/^address.*\.[a-z]+$/)}>{translate("address")}</Link>,
      disabled: !hasPermission(/^address.*\.[a-z]+$/),
      children: [
        {
          key: "addresses",
          icon: <FontAwesomeIcon icon={faMapLocationDot} style={menuIconStyle} />,
          label: <Link to={"/erp/address/addresses"} style={getLinkStyle(/^address\.[a-z]+$/)}>{translate("addresses")}</Link>,
          disabled: !hasPermission(/^address\.[a-z]+$/),
        },
      ],
    },
    {
      key: "customer",
      icon: <CustomerServiceOutlined style={menuIconStyle} />,
      label: translate("customers"),
      disabled: !hasPermission(/^customer\./),
      children: [
        {
          key: "customerHome",
          icon: <AreaChartOutlined style={menuIconStyle} />,
          label: <Link to={"/erp/customer"} style={getLinkStyle(/^customer\.read$/)}>{translate("statistics")}</Link>,
          disabled: !hasPermission(/^customer\.read$/),
        },
        {
          key: "customerlist",
          icon: <TableOutlined style={menuIconStyle} />,
          label: <Link to={"/erp/customer/list"} style={getLinkStyle(/^customer\.read$/)}>{translate("list_customers")}</Link>,
          disabled: !hasPermission(/^customer\.read$/),
        },
      ],
    },
    {
      key: "people",
      icon: <UserOutlined style={menuIconStyle} />,
      label: <Link to={"/people"} style={getLinkStyle(/^people\.read$/)}>{translate("peoples")}</Link>,
      disabled: !hasPermission(/^people\.read$/),
    },
    {
      key: "company",
      icon: <ShopOutlined style={menuIconStyle} />,
      label: <Link to={"/company"} style={getLinkStyle(/^company\.read$/)}>{translate("companies")}</Link>,
      disabled: !hasPermission(/^company\.read$/),
    },
    {
      key: "lead",
      icon: <FilterOutlined style={menuIconStyle} />,
      label: <Link to={"/lead"} style={getLinkStyle(/^lead\.read$/)}>{translate("leads")}</Link>,
      disabled: !hasPermission(/^lead\.read$/),
    },
    {
      key: "offer",
      icon: <FileOutlined style={menuIconStyle} />,
      label: <Link to={"/offer"} style={getLinkStyle(/^offer\.read$/)}>{translate("offers")}</Link>,
      disabled: !hasPermission(/^offer\.read$/),
    },
    {
      key: "invoice",
      icon: <ContainerOutlined style={menuIconStyle} />,
      label: <Link to={"/invoice"} style={getLinkStyle(/^invoice\.read$/)}>{translate("invoices")}</Link>,
      disabled: !hasPermission(/^invoice\.read$/),
    },
    {
      key: "quote",
      icon: <FileSyncOutlined style={menuIconStyle} />,
      label: <Link to={"/quote"} style={getLinkStyle(/^quote\.read$/)}>{translate("proforma invoices")}</Link>,
      disabled: !hasPermission(/^quote\.read$/),
    },
    {
      key: "payment",
      icon: <CreditCardOutlined style={menuIconStyle} />,
      label: <Link to={"/payment"} style={getLinkStyle(/^payment\.read$/)}>{translate("payments")}</Link>,
      disabled: !hasPermission(/^payment\.read$/),
    },
    {
      key: "categoryproduct",
      icon: <TagsOutlined style={menuIconStyle} />,
      label: <Link to={"/category/product"} style={getLinkStyle(/^categoryproduct\.read$/)}>{translate("products_category")}</Link>,
      disabled: !hasPermission(/^categoryproduct\.read$/),
    },
    {
      key: "expenses",
      icon: <WalletOutlined style={menuIconStyle} />,
      label: <Link to={"/expenses"} style={getLinkStyle(/^expenses\.read$/)}>{translate("expenses")}</Link>,
      disabled: !hasPermission(/^expenses\.read$/),
    },
    {
      key: "expensesCategory",
      icon: <ReconciliationOutlined style={menuIconStyle} />,
      label: <Link to={"/category/expenses"} style={getLinkStyle(/^expensesCategory\.read$/)}>{translate("expenses_Category")}</Link>,
      disabled: !hasPermission(/^expensesCategory\.read$/),
    },
    {
      key: "iam",
      icon: <FontAwesomeIcon icon={faFingerprint} style={menuIconStyle} />,
      label: <Link to={"/erp/iam"} style={getLinkStyle(/^user\.[a-z]+$/)}>{translate("iam")}</Link>,
      disabled: !hasPermission(/^user\.[a-z]+$/),
      children: [
        {
          key: "users",
          icon: <FontAwesomeIcon icon={faUsersGear} style={menuIconStyle} />,
          label: <Link to={"/erp/iam/users"} style={getLinkStyle(/^user\.[a-z]+$/)}>{translate("users")}</Link>,
          disabled: !hasPermission(/^user\.[a-z]+$/),
        },
        {
          key: "roles",
          icon: <FontAwesomeIcon icon={faUserTag} style={menuIconStyle} />,
          label: <Link to={"/erp/iam/roles"} style={getLinkStyle(/^role\.[a-z]+$/)}>{translate("roles")}</Link>,
          disabled: !hasPermission(/^role\.[a-z]+$/),
        },
        {
          key: "privileges",
          icon: <FontAwesomeIcon icon={faKey} style={menuIconStyle} />,
          label: <Link to={"/erp/iam/privileges"} style={getLinkStyle(/^privilege\.[a-z]+$/)}>{translate("privileges")}</Link>,
          disabled: !hasPermission(/^privilege\.[a-z]+$/),
        },
      ],
    },
    {
      label: translate("Settings"),
      key: "settings",
      icon: <SettingOutlined style={menuIconStyle} />,
      disabled: !hasPermission(/^settings\.read$/),
      children: [
        {
          key: "generalSettings",
          icon: <ReconciliationOutlined style={menuIconStyle} />,
          label: <Link to={"/settings"} style={getLinkStyle(/^settings\.read$/)}>{translate("settings")}</Link>,
          disabled: !hasPermission(/^settings\.read$/),
        },
        {
          key: "paymentMode",
          label: <Link to={"/payment/mode"} style={getLinkStyle(/^paymentMode\.read$/)}>{translate("payments_mode")}</Link>,
          disabled: !hasPermission(/^paymentMode\.read$/),
        },
        {
          key: "taxes",
          label: <Link to={"/taxes"} style={getLinkStyle(/^taxes\.read$/)}>{translate("taxes")}</Link>,
          disabled: !hasPermission(/^taxes\.read$/),
        },
        {
          key: "about",
          label: <Link to={"/about"} style={getLinkStyle(/^about\.read$/)}>{translate("about")}</Link>,
          disabled: !hasPermission(/^about\.read$/),
        },
      ],
    },
  ];


  return (
    <Menu
      className={"custom-scrollbar-display"}
      items={filterEnabledItems(items)}
      mode="inline"
      theme={theme}
      defaultSelectedKeys={"dashboard"}
      style={{
        overflow: "auto",
        borderRadius: "10px",
        height: "78dvh",
        paddingBottom: "30px",
        paddingTop: "10px",
        background: "inherit",
      }}
    />
  );
};

export default SidebarMenu;
