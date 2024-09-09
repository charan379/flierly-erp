import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useLocale from "@/features/Language/hooks/useLocale";

export default function Dashboard() {
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
            padding: "1px 2px 2px 5px",
            height: "90dvh",
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
