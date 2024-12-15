import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const { Content, Footer } = Layout;

const Dashboard: React.FC = () => {

  return (
    <Layout id="dashboard" style={{
      width: '100%',
      height: "100%"
    }}

    >
      <Header />
      <Content
        style={{
          width: "100%",
          padding: "0",
          height: "100%",
          margin: "0",
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
      <Footer
        id="dashboard-footer"
        style={{
          position: "relative",
          padding: "1px 5px",
          background: "var(--dashboard-item-bg-color) !important",
          color: "var(--dashboard-item-font-color) !important",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          height: "15px",
          overflow: "hidden",
          fontSize: "0.5rem"
        }}>
        <div>App</div>
        <div>Flierly ERP Web Portal</div>
        <div>Version v0.01</div>
      </Footer>
    </Layout>
  );
};

export default Dashboard;
