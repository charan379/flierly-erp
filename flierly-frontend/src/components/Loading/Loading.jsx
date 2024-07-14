import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

/**
 * Loading component to display a loading spinner while content is loading.
 *
 * @param {Object} props - Props passed to the component.
 * @param {boolean} props.isLoading - Flag to indicate if the content is loading.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the loading spinner.
 * @returns {JSX.Element} The rendered Loading component.
 */
const Loading = ({ isLoading, children }) => {
  // Defining the loading icon with spinning animation
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    // Spin component from Ant Design to display the loading spinner
    <Spin indicator={antIcon} spinning={isLoading}>
      {children} {/* Rendering child components wrapped by Spin */}
    </Spin>
  );
};

export default Loading;
