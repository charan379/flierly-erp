import useLocale from "@/features/Locale/hooks/useLocale";
import { Layout } from "antd";
import React from "react";
import LangSelector from "@/features/Locale/components/LangSelector";
import DropdownMenu from "./components/DropdownMenu";
import ThemeDropdown from "@/features/Theme/components/ThemeDropdown";

const AntHeader = Layout.Header;

const Header: React.FC = () => {
  const { langDirection } = useLocale();

  return (
    <AntHeader
      style={{
        position: "relative",
        padding: "5px 20px 5px 10px",
        background: "var(--bg-color-primary-flierly) !important",
        display: "flex",
        alignItems: "center",
        flexDirection: langDirection === "rtl" ? "row" : "row-reverse",
        justifyContent: "flex-start",
        gap: "15px",
        borderRadius: "10px",
        height: "45px",
        boxShadow: "var(--floating-section-box-shadow)",
        margin: "5px",
      }}
    >
      <DropdownMenu />
      <LangSelector />
      <ThemeDropdown />
    </AntHeader>
  );
};

export default Header;
