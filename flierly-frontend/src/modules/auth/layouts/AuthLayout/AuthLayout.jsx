import LangSelector from "@/features/Language/components/LangSelector";
import { ThemeToggler } from "@/features/Theme";
import useLocale from "@/features/Language/hooks/useLocale";
import { Col, Layout, Row } from "antd";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";

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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
              background: "var(--bg-color-secondary-flierly) !important",
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
            style={{
              minHeight: "100vh",
              background: "var(--bg-color-primary-lite-flierly) !important",
            }}
          >
            {/* Header */}
            <Layout.Header
              style={{
                padding: "15px",
                background: "var(--bg-color-primary-lite-flierly)",
                display: "flex",
                flexDirection: langDirection === "rtl" ? "row" : "row-reverse",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: " 15px",
              }}
            >
              {/* Lang selector */}
              <LangSelector />
              <ThemeToggler />
            </Layout.Header>
            {/* Auth forms / Children */}
            {children}
          </Col>
        </Row>
      </Layout>
    </ErrorBoundary>
  );
};

export default AuthLayout;
