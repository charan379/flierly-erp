import { Layout } from "antd";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SidebarMenu from "./components/SidebarMenu";

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
        height: "89dvh",
        borderRadius: "10px",
        boxShadow: "var(--floating-section-box-shadow)",
        background: "var(--bg-color-primary-flierly)",
        margin: "0px 0px 0px 5px",
        zIndex: "1",
      }}
      collapsedWidth={45}
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
