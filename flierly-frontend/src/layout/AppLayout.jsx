import useResponsive from "@/hooks/useResponsive";
import useLocale from "@/locale/useLocale";
import { Layout } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const { langDirection } = useLocale();
  const { isMobile } = useResponsive();

  const contentStyle = isMobile
    ? {
        margin: "40px auto 30px",
        overflow: "initial",
        width: "100%",
        padding: "0 50px",
        maxWidth: "none",
      }
    : {
        margin: "40px auto 30px",
        overflow: "initial",
        width: "100%",
        padding: "0 25px",
        maxWidth: 1400,
      };

  const layoutStyle = isMobile ? { marginLeft: 0 } : {};

  return (
    <Layout>
      <Header />
      <Layout
        hasSider
        style={{
          ...layoutStyle,
          flexDirection: langDirection === "rtl" ? "row-reverse" : "row",
        }}
      >
        <Sidebar />
        <Layout.Content
          style={{
            ...contentStyle,
            // background: "var(--bg-color-primary-flierly)",
            // boxShadow: "var(--floating-section-box-shadow)",
            height: "84dvh",
            margin: "5px 10px 5px 5px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
