import useLocale from '@/features/Locale/hooks/useLocale'
import { CompressOutlined } from '@ant-design/icons'
import { Flex, Space, Switch, Typography } from 'antd'
import React, { MouseEvent } from 'react'
import useTheme from '../../hooks/useTheme'

const ThemeCompactSwitch: React.FC = () => {
  const { translate: t } = useLocale();
  const { toggleCompactTheme, isCompactTheme } = useTheme();

  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleCompactTheme();
  }

  const handleSwitchChange = (_checked: boolean, event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleCompactTheme();
  }

  return (
    <Flex component="div" justify="space-between" align="center" vertical={false} onClick={handleContainerClick} style={{ width: '100%' }}>
      <Space direction="horizontal" size="large" style={{ display: 'flex' }}>
        <Typography.Title level={5} style={{ marginTop: '0.2em' }}>
          {t('theme.compact')}
        </Typography.Title>
        <CompressOutlined rotate={16} style={{ fontSize: '16px' }} />
      </Space>
      <Switch checked={isCompactTheme} onClick={handleSwitchChange} />
    </Flex>
  )
}

export default ThemeCompactSwitch
