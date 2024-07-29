import { Layout } from "antd";
import React, { useState } from "react";
import SidebarMenu from "./SidebarMenu";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      className={"custom-scrollbar-display"}
    //   trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        position: "relative",
        overflow: "auto",
        height: "95vh",
        borderRadius: "10px",
        boxShadow: "var(--floating-section-box-shadow)",
        margin: "10px",
      }}
      collapsedWidth={60}
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
