import React, { ReactNode, CSSProperties } from "react";
import ErrorFallback from "@/components/ErrorFallback";
import { Layout, Menu, Typography } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import getMenuItems from "../Dashboard/Navigation/utils/getMenuItems";
import useTheme from "@/features/Theme/hooks/useTheme";
import useLocale from "@/features/Locale/hooks/useLocale";

const { Header, Content, Footer } = Layout;

type DefaultModuleLayoutProps = {
  header?: boolean;
  title?: string | ReactNode,
  extra?: ReactNode[],
  footer?: ReactNode;
  children: ReactNode;
};

/**
 * DefaultModuleLayout component to structure a layout with optional header, footer, and error boundary.
 * footer wont be dispalyed in this layout
 */
const DefaultModuleLayout: React.FC<DefaultModuleLayoutProps> = ({
  header,
  footer,
  extra,
  title,
  children,
}) => {

  const { theme } = useTheme();
  const { translate } = useLocale();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout style={styles.layout}>
        {header &&
          <Header style={styles.header}>
            {typeof title === 'string' ? <Typography.Title level={4}>{translate(title)}</Typography.Title> : title}
            <div style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: '10px'
            }}>
              <Menu
                theme={theme}
                className="no-scrollbar"
                items={getMenuItems().filter(m => m.key === "iam")}
                mode="horizontal"
                selectable={false}
                style={{
                  maxHeight: 'inherit',
                  backgroundColor: "inherit",
                  border: "none"
                }}
              />
              {extra}
            </div>
          </Header>
        }
        <Content className="sb-thumb-md" style={styles.content}>
          {children}
        </Content>
        {footer && <Footer style={styles.footer}>{footer}</Footer>}
      </Layout>
    </ErrorBoundary>
  );
};

export default DefaultModuleLayout;

const styles: Record<string, CSSProperties> = {
  layout: {
    height: "100%",
    width: "100%",
  },
  header: {
    padding: "0px 5px",
    display: "flex",
    backgroundColor: "inherit",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    overflowX: "hidden",
    overflowY: "hidden",
    maxHeight: "40px",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "center",
    padding: "1px 5px",
    flexWrap: "wrap",
    overflow: "auto",
  },
  footer: {
    width: "100%",
    display: "none",
    padding: "0px",
  },
};
