import useTheme from '@/modules/core/features/Theme/hooks/useTheme'

import { Menu } from 'antd'
import React from 'react'
import filterEnabledItems from '../../../Navigation/utils/filter-enabled-items'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import createMenuItems from '../../../Navigation/utils/create-menu-items'

const SidebarMenu: React.FC = () => {
  const { theme } = useTheme();
  const { translate: t } = useLocale()
  const { hasPermission } = useAuth();

  return (
    <Menu
      className={'custom-scrollbar-display'}
      items={filterEnabledItems(createMenuItems(t, hasPermission))}
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
