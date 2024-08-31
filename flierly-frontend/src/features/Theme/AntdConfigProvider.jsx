import { ConfigProvider, theme } from "antd";
import React, { useMemo } from "react";
import enUS from "antd/locale/en_US";
import useTheme from "./hooks/useTheme";

/**
 * AntdConfigProvider component wraps the entire application with Ant Design's ConfigProvider.
 *
 * @param {Object} props - Props passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by ConfigProvider.
 * @returns {JSX.Element} The rendered AntdConfigProvider component.
 */
const AntdConfigProvider = React.memo(({ children }) => {
  const { theme: localThemeMode, isCompactTheme } = useTheme(); // Get current theme mode and preference

  // Memoize the theme algorithms to avoid unnecessary recalculations
  const antThemeAlgorithms = useMemo(() => {
    const algorithms = new Set();

    if (localThemeMode === "dark") {
      algorithms.add(theme.darkAlgorithm); // Add dark theme algorithm if dark mode is enabled
    } else if (localThemeMode === "light") {
      algorithms.add(theme.defaultAlgorithm); // Add default theme algorithm if light mode is enabled
    }

    if (isCompactTheme) {
      algorithms.add(theme.compactAlgorithm); // Add compact theme algorithm if compact theme is enabled
    }

    return Array.from(algorithms); // Convert Set to Array
  }, [localThemeMode, isCompactTheme]); // Dependencies for useMemo

  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        algorithm: antThemeAlgorithms, // Set the theme algorithms based on the configuration
        components: {
          Menu: {
            darkSubMenuItemBg: "inherit",
            darkItemBg: "inherit",
            darkPopupBg: "var(--bg-color-secondary-flierly)",
          },
        },
      }}
    >
      {children} {/* Render child components wrapped by ConfigProvider */}
    </ConfigProvider>
  );
});

export default AntdConfigProvider;
