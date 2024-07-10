import { ConfigProvider } from "antd";

export default function AntdConfigProvider({ children }) {
    return (
        <ConfigProvider>
            {children}
        </ConfigProvider>
    )
}