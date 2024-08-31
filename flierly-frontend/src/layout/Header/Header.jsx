import useLocale from "@/features/Language/hooks/useLocale";
import { Layout } from "antd";
import React from "react";
import DropdownMenu from "./components/DropdownMenu";
import LangSelector from "@/features/Language/components/LangSelector";
import { ThemeDropdown } from "@/features/Theme";

const AntHeader = Layout.Header;

const Header = () => {
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
        height: "55px",
        boxShadow: "var(--floating-section-box-shadow)",
        margin: "10px",
      }}
    >
      <DropdownMenu />
      <LangSelector />
      <ThemeDropdown />
    </AntHeader>
  );
};

export default Header;
