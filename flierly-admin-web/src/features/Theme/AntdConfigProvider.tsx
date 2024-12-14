import { ConfigProvider, MappingAlgorithm, theme } from "antd";
import React, { ReactNode, useMemo } from "react";
import useTheme from "./hooks/useTheme";
import enUS from "antd/locale/en_US";

type Props = {
  children: ReactNode;
};

const AntdConfigProvider: React.FC<Props> = React.memo(({ children }) => {
  const { theme: localThemeMode, isCompactTheme } = useTheme();

  // Memoize the theme algorithms to avoid unnecessary recalculations
  const antThemeAlgorithms: MappingAlgorithm[] = useMemo(() => {
    const algorithms = new Set<MappingAlgorithm>();

    if (localThemeMode === "dark") {
      algorithms.add(theme.darkAlgorithm);
    } else if (localThemeMode === "light") {
      algorithms.add(theme.defaultAlgorithm);
    }

    if (isCompactTheme) {
      algorithms.add(theme.compactAlgorithm);
    }

    // Filter out undefined and ensure a flat array
    return Array.from(algorithms);
  }, [localThemeMode, isCompactTheme]);

  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        algorithm: antThemeAlgorithms,
        components: {
          Menu: {
            darkSubMenuItemBg: "inherit",
            darkItemBg: "inherit",
            darkPopupBg: "var(--bg-color-secondary-flierly)",
          },
          Dropdown: {
            colorBgElevated: "var(--popup-bg-color)"
          }
        },
      }}
    >
      {children} {/* Render child components wrapped by ConfigProvider */}
    </ConfigProvider>
  );
});

export default AntdConfigProvider;
