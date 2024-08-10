import { Layout } from "antd";
import React, { useState } from "react";
import SidebarMenu from "./components/SidebarMenu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      className={"no-scrollbar"}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        position: "relative",
        overflow: "auto",
        height: "84dvh",
        borderRadius: "10px",
        boxShadow: "var(--floating-section-box-shadow)",
        background: "var(--bg-color-primary-flierly)",
        margin: "2px 5px 10px 10px",
        zIndex: "1",
      }}
      collapsedWidth={60}
      width={240}
      trigger={
        collapsed ? (
          <MenuUnfoldOutlined style={{ fontSize: "28px" }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: "28px" }} />
        )
      }
    >
      <SidebarMenu sidebarClosed={collapsed} />
    </Sider>
  );
};

export default Sidebar;
