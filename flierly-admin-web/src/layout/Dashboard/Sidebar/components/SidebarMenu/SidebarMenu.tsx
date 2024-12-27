import useTheme from '@/features/Theme/hooks/useTheme'
import { Menu } from 'antd'
import React from 'react'
import filterEnabledItems from '../../../Navigation/utils/filter-enabled-items'
import createMenuItems from '@/layout/Dashboard/Navigation/utils/create-menu-items'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import useLocale from '@/features/Locale/hooks/useLocale'

const SidebarMenu: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLocale()
  const { hasPermission } = useAuth();

  return (
    <Menu
      className={'custom-scrollbar-display'}
      items={filterEnabledItems(createMenuItems(translate, hasPermission))}
      mode="inline"
      theme={theme}
      defaultSelectedKeys={['dashboard']}
      selectable={false}
      style={{
        overflow: 'auto',
        borderRadius: '10px',
        height: '78dvh',
        paddingBottom: '30px',
        paddingTop: '10px',
        background: 'red',
        textAlign: 'start',
      }}
    />
  )
}

export default SidebarMenu
