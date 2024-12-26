import { BulbFilled, MoonFilled, SunFilled } from '@ant-design/icons'
import Icon from '@ant-design/icons'
import { Avatar, Button } from 'antd'

import React from 'react'
import useTheme from '../../hooks/useTheme'

interface ThemeTogglerProps {
  functional?: boolean
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({ functional = true }) => {
  const { themePreference, setThemePreference } = useTheme()

  const themeIcon = () => {
    if (themePreference === 'system') return <Icon component={A} />
    if (themePreference === 'dark') return <MoonFilled />
    if (themePreference === 'light') return <SunFilled />
    return <BulbFilled />
  }

  return (
    <Button
      type="default"
      shape="circle"
      size="middle"
      icon={themeIcon()}
      onClick={() => {
        if (!functional) return
        switch (themePreference) {
          case 'system':
            setThemePreference('light')
            break
          case 'light':
            setThemePreference('dark')
            break
          case 'dark':
            setThemePreference('system')
            break
          default:
            break
        }
      }}
    />
  )
}

const A: React.FC = () => {
  return (
    <Avatar
      style={{
        backgroundColor: 'var(--bg-color-primary-flierly)',
        color: 'var(--font-color-primary-flierly)',
        fontSize: '20px',
      }}
    >
      A
    </Avatar>
  )
}

export default ThemeToggler
