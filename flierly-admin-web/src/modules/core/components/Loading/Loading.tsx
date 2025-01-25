import React, { ReactNode } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

interface LoadingProps {
  isLoading: boolean // Flag indicating if content is loading
  children: ReactNode // Children to render when not loading
}

/**
 * Loading component to display a loading spinner while content is loading.
 */
const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
  // Defining the loading icon with spinning animation
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

  return (
    // Spin component from Ant Design to display the loading spinner
    <Spin indicator={antIcon} spinning={isLoading}>
      {children} {/* Rendering child components wrapped by Spin */}
    </Spin>
  )
}

export default Loading
