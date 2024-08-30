import useLocale from "@/locale/useLocale";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useTheme } from "@/theme/useTheme";
import {
  AreaChartOutlined,
  ClusterOutlined,
  ContainerOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
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

const SidebarMenu = () => {
  const { theme } = useTheme();
  const { translate } = useLocale();

  const { allowedAccess } = useAuth();

  const menuIconStyle = { fontSize: "18px" };

  const getLinkStyle = (allowedAccess, requiredPermission) => {
    return {
      pointerEvents: allowedAccess.includes(requiredPermission) ? 'all' : 'none',
      // color: allowedAccess.includes(requiredPermission) ? 'inherit' : 'gray',
      // textDecoration: allowedAccess.includes(requiredPermission) ? 'underline' : 'none',
    };
  };

  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined style={menuIconStyle} />,
      label: <Link to={"/"}>{translate("dashboard")}</Link>,
    },
    {
      key: "branch",
      icon: <ClusterOutlined style={menuIconStyle} />,
      label: translate("branchs"),
      disabled: !allowedAccess.some(access => /^branch\./.test(access)),
      children: [
        {
          key: "branchHome",
          icon: <AreaChartOutlined style={menuIconStyle} />,
          label: <Link to={"/branch"} style={getLinkStyle(allowedAccess, 'branch.read')}>{translate("statistics")}</Link>,
          disabled: !allowedAccess.includes('branch.read')
        },
        {
          key: "branchlist",
          icon: <TableOutlined style={menuIconStyle} />,
          label: <Link to={"/branch/list"} style={getLinkStyle(allowedAccess, 'branch.read')}>{translate("list_branchs")}</Link>,
          disabled: !allowedAccess.includes('branch.read')
        },
      ],
    },
    {
      key: "customer",
      icon: <CustomerServiceOutlined style={menuIconStyle} />,
      label: translate("customers"),
      disabled: !allowedAccess.some(access => /^customer\./.test(access)),
      children: [
        {
          key: "customerHome",
          icon: <AreaChartOutlined style={menuIconStyle} />,
          label: <Link to={"/customer"} style={getLinkStyle(allowedAccess, 'customer.read')}>{translate("statistics")}</Link>,
          disabled: !allowedAccess.includes('customer.read')
        },
        {
          key: "customerlist",
          icon: <TableOutlined style={menuIconStyle} />,
          label: <Link to={"/customer/list"} style={getLinkStyle(allowedAccess, 'customer.read')}>{translate("list_customers")}</Link>,
          disabled: !allowedAccess.includes('customer.read')
        },
      ],
    },
    {
      key: "people",
      icon: <UserOutlined style={menuIconStyle} />,
      label: <Link to={"/people"} style={getLinkStyle(allowedAccess, 'people.read')}>{translate("peoples")}</Link>,
      disabled: !allowedAccess.includes('people.read')
    },
    {
      key: "company",
      icon: <ShopOutlined style={menuIconStyle} />,
      label: <Link to={"/company"} style={getLinkStyle(allowedAccess, 'company.read')}>{translate("companies")}</Link>,
      disabled: !allowedAccess.includes('company.read')
    },
    {
      key: "lead",
      icon: <FilterOutlined style={menuIconStyle} />,
      label: <Link to={"/lead"} style={getLinkStyle(allowedAccess, 'lead.read')}>{translate("leads")}</Link>,
      disabled: !allowedAccess.includes('lead.read')
    },
    {
      key: "offer",
      icon: <FileOutlined style={menuIconStyle} />,
      label: <Link to={"/offer"} style={getLinkStyle(allowedAccess, 'offer.read')}>{translate("offers")}</Link>,
      disabled: !allowedAccess.includes('offer.read')
    },
    {
      key: "invoice",
      icon: <ContainerOutlined style={menuIconStyle} />,
      label: <Link to={"/invoice"} style={getLinkStyle(allowedAccess, 'invoice.read')}>{translate("invoices")}</Link>,
      disabled: !allowedAccess.includes('invoice.read')
    },
    {
      key: "quote",
      icon: <FileSyncOutlined style={menuIconStyle} />,
      label: <Link to={"/quote"} style={getLinkStyle(allowedAccess, 'quote.read')}>{translate("proforma invoices")}</Link>,
      disabled: !allowedAccess.includes('quote.read')
    },
    {
      key: "payment",
      icon: <CreditCardOutlined style={menuIconStyle} />,
      label: <Link to={"/payment"} style={getLinkStyle(allowedAccess, 'payment.read')}>{translate("payments")}</Link>,
      disabled: !allowedAccess.includes('payment.read')
    },
    {
      key: "product",
      icon: <TagOutlined style={menuIconStyle} />,
      label: <Link to={"/product"} style={getLinkStyle(allowedAccess, 'product.read')}>{translate("products")}</Link>,
      disabled: !allowedAccess.includes('product.read')
    },
    {
      key: "categoryproduct",
      icon: <TagsOutlined style={menuIconStyle} />,
      label: <Link to={"/category/product"} style={getLinkStyle(allowedAccess, 'categoryproduct.read')}>{translate("products_category")}</Link>,
      disabled: !allowedAccess.includes('categoryproduct.read')
    },
    {
      key: "expenses",
      icon: <WalletOutlined style={menuIconStyle} />,
      label: <Link to={"/expenses"} style={getLinkStyle(allowedAccess, 'expenses.read')}>{translate("expenses")}</Link>,
      disabled: !allowedAccess.includes('expenses.read')
    },
    {
      key: "expensesCategory",
      icon: <ReconciliationOutlined style={menuIconStyle} />,
      label: <Link to={"/category/expenses"} style={getLinkStyle(allowedAccess, 'expensesCategory.read')}>{translate("expenses_Category")}</Link>,
      disabled: !allowedAccess.includes('expensesCategory.read')
    },
    {
      label: translate("Settings"),
      key: "settings",
      icon: <SettingOutlined style={menuIconStyle} />,
      disabled: !allowedAccess.includes('settings.read'),
      children: [
        {
          key: "generalSettings",
          icon: <ReconciliationOutlined style={menuIconStyle} />,
          label: <Link to={"/settings"} style={getLinkStyle(allowedAccess, 'settings.read')}>{translate("settings")}</Link>,
          disabled: !allowedAccess.includes('settings.read')
        },
        {
          key: "paymentMode",
          label: <Link to={"/payment/mode"} style={getLinkStyle(allowedAccess, 'paymentMode.read')}>{translate("payments_mode")}</Link>,
          disabled: !allowedAccess.includes('paymentMode.read')
        },
        {
          key: "taxes",
          label: <Link to={"/taxes"} style={getLinkStyle(allowedAccess, 'taxes.read')}>{translate("taxes")}</Link>,
          disabled: !allowedAccess.includes('taxes.read')
        },
        {
          key: "about",
          label: <Link to={"/about"} style={getLinkStyle(allowedAccess, 'about.read')}>{translate("about")}</Link>,
          disabled: !allowedAccess.includes('about.read')
        },
      ],
    },
  ];


  return (
    <Menu
      className={"custom-scrollbar-display"}
      items={items}
      mode="inline"
      theme={theme}
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
