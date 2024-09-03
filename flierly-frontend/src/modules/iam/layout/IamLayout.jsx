import { Layout } from "antd";
import React from "react";

const { Header, Content, Footer } = Layout;

const IamLayout = ({ header, footer, children }) => {
  return (
    <Layout style={{ ...styles.layout }}>
      {header ? <Header style={{ ...styles.header }}>{header}</Header> : <></>}
      <Content className="sb-thumb-md" style={{ ...styles.content }}>
        {children}
      </Content>
      {footer ? <Footer style={{ ...styles.footer }}>{footer}</Footer> : <></>}
    </Layout>
  );
};

export default IamLayout;

const styles = {
  layout: {
    height: "100%",
    width: "100%",
    background: "var(--bg-color-primary-flierly) !important",
    boxShadow: "var(--floating-section-box-shadow) !important",
    borderRadius: "10px",
  },
  header: {
    padding: "0px 15px",
    background: "inherit",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    width: "100%",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "center",
    flexWrap: "wrap",
    overflow: "auto",
  },
  footer: {
    background: "inherit",
    padding: "5px 15px",
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
  },
};
