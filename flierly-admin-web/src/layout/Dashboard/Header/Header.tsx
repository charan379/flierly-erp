import { Drawer, Layout, Space } from "antd";
import React, { useEffect, useState } from "react";
import LangSelector from "@/features/Locale/components/LangSelector";
import ProfileDropdown from "./components/ProfileDropdown";
import ThemeDropdown from "@/features/Theme/components/ThemeDropdown";
import "./header.css";
import { MenuFoldOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavigationMenu from "../Navigation/components/NavigationMenu";
import { useLocation } from "react-router-dom";
import SearchableMenu from "../Navigation/components/SearchableMenu";

const AntHeader = Layout.Header;

const Header: React.FC = () => {

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenuOpen = (_e: React.MouseEvent | React.KeyboardEvent) => {
    setMenuOpen(true);
  };

  const handleMenuClose = (_e?: React.MouseEvent | React.KeyboardEvent) => {
    setMenuOpen(false);
  };

  // on route change
  useEffect(() => {
    handleMenuClose();
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AntHeader
      id="dashboard-header"
      style={{
        position: "relative",
        padding: "0px 20px 0px 0px",
        background: "var(--dashboard-header-bg-color) !important",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "10px",
        height: "40px",
        boxShadow: "var(--floating-section-box-shadow)",
        marginBottom: "2px",
        overflow: "hidden"
      }}
    >
      {/* nav and title */}
      <div className="dashboard-header-section" id="dashboard-header-left-section">
        {/* trigger */}
        <div
          id="dashboard-menu-trigger"
          onClick={handleMenuOpen}>
          <FontAwesomeIcon icon={faBars} size="xl" cursor="pointer" color="#fff" />
        </div>
        {/* title */}
        <div id="dashboard-title-section">
          <h3 id="app-title">Fliery ERP Web Portal</h3>
        </div>
        {/* drawer nav */}
        <Drawer
          placement="left"
          open={menuOpen}
          onClose={handleMenuClose}
          closeIcon={null}
          title={"Fliery ERP Web Portal"}
          styles={{
            body: { padding: 5 },
            header: { maxHeight: "40px", backgroundColor: "var(--dashboard-header-bg-color)", color: "#fff" }
          }}
          width={320}
          extra={
            <Space>
              <MenuFoldOutlined style={{ fontSize: "26px", cursor: "pointer" }} onClick={handleMenuClose} />
            </Space>
          }
        >
          {/* menu */}
          <SearchableMenu />
          <NavigationMenu />
        </Drawer>
      </div>
      {/* search */}
      <div className="dashboard-header-section" id="dashboard-header-center-section">
        <SearchableMenu />
      </div>
      {/* right side features */}
      <div className="dashboard-header-section" id="dashboard-header-right-section">
        <ThemeDropdown />
        <LangSelector />
        <ProfileDropdown />
      </div>
    </AntHeader>
  );
};

export default Header;
