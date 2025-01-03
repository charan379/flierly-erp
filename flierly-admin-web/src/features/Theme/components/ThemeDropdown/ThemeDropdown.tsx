import { Badge, Dropdown, MenuProps } from 'antd'
import React, { useState } from 'react'
import ThemeToggler from '../ThemeToggler'
import ThemeSwitcher from '../ThemeSwitcher'
import ThemeCompactSwitch from '../ThemeCompactSwitch'

const ThemeDropdown: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (nextOpen: boolean, info: { source: string }) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  }

  const items: MenuProps['items'] = [
    {
      label: <ThemeSwitcher />,
      key: 'theme-switch',
    },
    {
      type: 'divider',
    },
    {
      label: <ThemeCompactSwitch />,
      key: 'theme-compact-switch',
    },
  ]

  return (
    <Dropdown
      trigger={['click']}
      autoAdjustOverflow
      menu={{ items }}
      placement="bottom"
      overlayStyle={{ width: 'max-content' }}
      onOpenChange={handleOpenChange}
      open={open}
      arrow={true}
      destroyPopupOnHide={true}
    >
      <Badge>
        <ThemeToggler functional={false} />
      </Badge>
    </Dropdown>
  )
}

export default ThemeDropdown
