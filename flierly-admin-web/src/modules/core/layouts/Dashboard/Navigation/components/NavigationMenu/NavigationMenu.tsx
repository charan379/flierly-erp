import { Menu } from 'antd'
import React from 'react'
import filterEnabledItems from '../../utils/filter-enabled-items'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import createMenuItems from '../../utils/create-menu-items'
import useTheme from '@/modules/core/features/Theme/hooks/useTheme'

const NavigationMenu: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLocale();
  const { hasPermission } = useAuth();

  return (
    <Menu
      className={'custom-scrollbar-display'}
      items={filterEnabledItems(createMenuItems(translate, hasPermission))}
      mode="inline"
      theme={theme}
      selectable={false}
      style={{
        overflow: 'auto',
        background: 'inherit',
        textAlign: 'start',
      }}
    />
  )
}

export default NavigationMenu
