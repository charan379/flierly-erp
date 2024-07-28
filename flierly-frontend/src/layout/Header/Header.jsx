import useLocale from "@/locale/useLocale";
import { Layout } from "antd";
import React from "react";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import LangSelector from "@/features/Language/LangSelector";
import ThemeToggler from "@/features/Theme/ThemeToggler";
import ThemeDropdown from "@/features/Theme/ThemeDropdown";

const AntHeader = Layout.Header;

const Header = () => {
  const { langDirection } = useLocale();

  return (
    <AntHeader
      style={{
        padding: "20px",
        background: "#f9fafc",
        display: "flex",
        flexDirection: langDirection === "rtl" ? "row" : "row-reverse",
        justifyContent: "flex-start",
        gap: " 15px",
      }}
    >
      <DropdownMenu />
      <LangSelector />
      <ThemeDropdown />
    </AntHeader>
  );
};

export default Header;
