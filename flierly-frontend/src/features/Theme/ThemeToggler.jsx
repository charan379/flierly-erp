import { useTheme } from '@/theme/useTheme';
import { BulbFilled, MoonFilled, SunFilled, } from '@ant-design/icons'
import Icon from '@ant-design/icons';
import { Button, Tooltip } from 'antd'
import React from 'react'

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();

    const themeIcon = () => {
        if (theme === 'system') return <Icon component={A} />;
        if (theme === 'dark') return <MoonFilled />;
        if (theme === 'light') return <SunFilled />;
        return <BulbFilled />
    }

    return (
        <Tooltip title="Toggle Theme">
            <Button
                type='default'
                shape='circle'
                size='large'
                style={{
                    marginTop: '5px',
                }}
                icon={themeIcon()}
                onClick={() => {
                    switch (theme) {
                        case 'system':
                            setTheme('light');
                            break;
                        case 'light':
                            setTheme('dark');
                            break;
                        case 'dark':
                            setTheme('system');
                            break;
                        default:
                            break;
                    }
                }}
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