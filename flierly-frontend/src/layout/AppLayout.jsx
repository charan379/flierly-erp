import useLocale from "@/locale/useLocale";
import { Layout } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const { langDirection } = useLocale();

  return (
    <Layout>
      <Header />
      <Layout
        hasSider
        style={{
          flexDirection: langDirection === "rtl" ? "row-reverse" : "row",
        }}
      >
        <Sidebar />
        <Layout.Content
          style={{
            width: "100%",
            // background: "var(--bg-color-primary-flierly)",
            // boxShadow: "var(--floating-section-box-shadow)",
            padding: "5px 10px 5px 5px",
            height: "85dvh",
            margin: "0",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            overflow: "scroll",
            opacity: "1",
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
