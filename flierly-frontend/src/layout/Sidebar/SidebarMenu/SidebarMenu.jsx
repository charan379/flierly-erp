import useLocale from "@/locale/useLocale";
import { useTheme } from "@/theme/useTheme";
import {
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
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const SidebarMenu = ({ sidebarClosed }) => {
  const { theme } = useTheme();
  const { translate } = useLocale();

  const menuIconStyle = { fontSize: "16px", color: "var(--font-color-primary-flierly)" };

  const items = [
    {
      key: "dashboard-1",
      icon: <DashboardOutlined style={menuIconStyle} />,
      label: <Link to={"/"}>{translate("dashboard")}</Link>,
    },
    {
      key: "dashboard-2",
      icon: <DashboardOutlined style={menuIconStyle} />,
      label: <Link to={"/"}>{translate("dashboard")}</Link>,
    },
    {
      key: "dashboard-3",
      icon: <DashboardOutlined style={menuIconStyle} />,
      label: <Link to={"/"}>{translate("dashboard")}</Link>,
    },
    {
      key: "dashboard",
      icon: <DashboardOutlined style={menuIconStyle} />,
      label: <Link to={"/"}>{translate("dashboard")}</Link>,
    },
    {
      key: "customer",
      icon: <CustomerServiceOutlined style={menuIconStyle} />,
      label: <Link to={"/customer"}>{translate("customers")}</Link>,
    },
    {
      key: "people",
      icon: <UserOutlined style={menuIconStyle} />,
      label: <Link to={"/people"}>{translate("peoples")}</Link>,
    },
    {
      key: "company",
      icon: <ShopOutlined style={menuIconStyle} />,
      label: <Link to={"/company"}>{translate("companies")}</Link>,
    },
    {
      key: "lead",
      icon: <FilterOutlined style={menuIconStyle} />,
      label: <Link to={"/lead"}>{translate("leads")}</Link>,
    },
    {
      key: "offer",
      icon: <FileOutlined style={menuIconStyle} />,
      label: <Link to={"/offer"}>{translate("offers")}</Link>,
    },
    {
      key: "invoice",
      icon: <ContainerOutlined style={menuIconStyle} />,
      label: <Link to={"/invoice"}>{translate("invoices")}</Link>,
    },
    {
      key: "quote",
      icon: <FileSyncOutlined style={menuIconStyle} />,
      label: <Link to={"/quote"}>{translate("proforma invoices")}</Link>,
    },
    {
      key: "payment",
      icon: <CreditCardOutlined style={menuIconStyle} />,
      label: <Link to={"/payment"}>{translate("payments")}</Link>,
    },

    {
      key: "product",
      icon: <TagOutlined style={menuIconStyle} />,
      label: <Link to={"/product"}>{translate("products")}</Link>,
    },
    {
      key: "categoryproduct",
      icon: <TagsOutlined style={menuIconStyle} />,
      label: (
        <Link to={"/category/product"}>{translate("products_category")}</Link>
      ),
    },
    {
      key: "expenses",
      icon: <WalletOutlined style={menuIconStyle} />,
      label: <Link to={"/expenses"}>{translate("expenses")}</Link>,
    },
    {
      key: "expensesCategory",
      icon: <ReconciliationOutlined style={menuIconStyle} />,
      label: (
        <Link to={"/category/expenses"}>{translate("expenses_Category")}</Link>
      ),
    },

    {
      label: translate("Settings"),
      key: "settings",
      icon: <SettingOutlined style={menuIconStyle} />,
      children: [
        {
          key: "generalSettings",
          icon: <ReconciliationOutlined style={menuIconStyle} />,
          label: <Link to={"/settings"}>{translate("settings")}</Link>,
        },

        {
          key: "paymentMode",
          label: <Link to={"/payment/mode"}>{translate("payments_mode")}</Link>,
        },
        {
          key: "taxes",
          label: <Link to={"/taxes"}>{translate("taxes")}</Link>,
        },
        {
          key: "about",
          label: <Link to={"/about"}>{translate("about")}</Link>,
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
        height: "95dvh",
        paddingBottom: "40px",
        background: "none",
      }}
    />
  );
};

export default SidebarMenu;
