import useLocale from "@/redux/locale/useLocale";
import { Col, Layout, Row } from "antd";
import React from "react";

/**
 * AuthLayout component to create a layout for authentication related pages.
 *
 * @param {Object} props - Props passed to the component.
 * @param {React.ReactNode} props.rightSideContent - Content to be displayed on the right side (e.g., an image or promotional content).
 * @param {React.ReactNode} props.children - Main content to be displayed (e.g., a form or main text).
 * @returns {JSX.Element} The rendered component.
 */
const AuthLayout = ({ rightSideContent, children }) => {
  // Using the useLocale hook to get the current language direction (ltr or rtl)
  const { langDirection } = useLocale();

  return (
    // Setting up the Layout component with dynamic text alignment and direction based on langDirection
    <Layout
      style={{
        textAlign: langDirection === "rtl" ? "right" : "left",
        direction: langDirection,
      }}
    >
      {/* Using Row and Col components to define a responsive layout */}
      <Row>
        {/* Column for right side content, hidden on extra small and small screens */}
        <Col
          xs={{ span: 0, order: 2 }}
          sm={{ span: 0, order: 2 }}
          md={{ span: 11, order: 1 }}
          lg={{ span: 12, order: 1 }}
          style={{
            minHeight: "100vh",
          }}
        >
          {rightSideContent}
        </Col>
        {/* Column for main content, takes full width on extra small and small screens */}
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 13, order: 2 }}
          lg={{ span: 12, order: 2 }}
          style={{ background: "#FFF", minHeight: "100vh" }}
        >
          {children}
        </Col>
      </Row>
    </Layout>
  );
};

export default AuthLayout;
