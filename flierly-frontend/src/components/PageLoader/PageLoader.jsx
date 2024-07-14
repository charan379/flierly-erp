import React from 'react';
import { Spin } from 'antd';

/**
 * PageLoader component to display a loading spinner.
 * 
 * @returns {JSX.Element} The rendered PageLoader component.
 */
const PageLoader = () => {
    return (
        <div className='centerAbsolute'>
            <Spin size='large' /> {/* Using Spin component from Ant Design with large size */}
        </div>
    );
};

export default PageLoader;
