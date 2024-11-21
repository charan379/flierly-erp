import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import useLocale from "@/features/Locale/hooks/useLocale";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const Dashboard: React.FC = () => {
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
        <Content
          style={{
            width: "100%",
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
