import React from 'react';
import { Spin } from 'antd';

const PageLoader: React.FC = () => {
    return (
        <div className='centerAbsolute'>
            <Spin size='large' /> {/* Using Spin component from Ant Design with large size */}
        </div>
    );
};

export default PageLoader;
