import { Layout, Modal, Typography } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import LoginForm from "@/modules/auth/forms/LoginForm";

const { Content, Footer } = Layout;

const Dashboard: React.FC = () => {

  const { isExpired, error } = useAuth();

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
        {/* outlet */}
        <Outlet />
        {/* auth modal */}
        <Modal
          open={isExpired}
          closable={false}
          title={<Typography.Title level={4} type="danger" style={{ textAlign: "center" }}>{error?.message}</Typography.Title>}
          footer={false}
          styles={{
            mask: {
              backgroundColor: "rgb(0 0 0 / 75%)"
            },
            content: {
              padding: "1px 16px"
            }
          }}
        >
          <LoginForm redirectOnLogin={false} />
        </Modal>
        {/*  */}
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
