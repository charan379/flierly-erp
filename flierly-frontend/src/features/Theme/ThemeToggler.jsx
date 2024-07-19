import { BulbFilled, BulbOutlined, BulbTwoTone, SunFilled, } from '@ant-design/icons'
import Icon from '@ant-design/icons';
import { Button, Tooltip } from 'antd'
import React from 'react'

const ThemeToggler = () => {
    return (
        <Tooltip title="Toggle Theme">
            <Button
                type='default'
                shape='circle'
                size='large'
                style={{
                    marginTop: '5px',
                }}
                icon={<Icon component={A} />}
            />
        </Tooltip>
    )
}

const A = () => {
    return (
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <text x="10" y="28" fontFamily="Verdana" fontSize="25" fill="black">A</text>
        </svg>
    )
}

export default ThemeToggler