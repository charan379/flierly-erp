import React from 'react'
import { Spin } from 'antd';

const PageLoader = () => {
    return (
        <div>
            <Spin size='large' tip='Loading...' />
        </div>
    )
}

export default PageLoader