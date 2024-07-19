// Importing ConfigProvider from Ant Design to configure global settings for components
import { ConfigProvider, theme } from "antd";

/**
 * AntdConfigProvider component wraps the entire application with Ant Design's ConfigProvider.
 *
 * @param {Object} props - Props passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by ConfigProvider.
 * @returns {JSX.Element} The rendered AntdConfigProvider component.
 */
export default function AntdConfigProvider({ children }) {
  return (
    // ConfigProvider component from Ant Design to provide global configuration
    <ConfigProvider
      theme={{
        algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm]
      }}
    >
      {children} {/* Rendering child components wrapped by ConfigProvider */}
    </ConfigProvider>
  );
}
