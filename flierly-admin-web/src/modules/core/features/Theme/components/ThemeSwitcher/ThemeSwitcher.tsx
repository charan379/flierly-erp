import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { Avatar, Segmented } from 'antd'
import React from 'react'
import useTheme from '../../hooks/useTheme'

const ThemeSwitcher: React.FC = () => {
  const { themePreference, setThemePreference } = useTheme();
  const { translate: t } = useLocale();

  const onValueChange = (value: ThemePreference): void => {
    setThemePreference(value);
  }

  const options = [
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar
            icon={<SunFilled />}
            style={{
              backgroundColor: 'var(--bg-color-primary-flierly)',
              color: 'var(--font-color-primary-flierly)',
              fontSize: '20px',
              opacity: themePreference === 'light' ? 1 : 0.5,
            }}
          />
          <div>{t('theme.light')}</div>
        </div>
      ),
      value: 'light' as ThemePreference,
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar
            icon={<MoonFilled />}
            style={{
              backgroundColor: 'var(--bg-color-primary-flierly)',
              color: 'var(--font-color-primary-flierly)',
              fontSize: '20px',
              opacity: themePreference === 'dark' ? 1 : 0.5,
            }}
          />
          <div>{t('theme.dark')}</div>
        </div>
      ),
      value: 'dark' as ThemePreference,
    },
    {
      label: (
        <div style={{ padding: 4 }}>
          <Avatar
            style={{
              backgroundColor: 'var(--bg-color-primary-flierly)',
              color: 'var(--font-color-primary-flierly)',
              fontSize: '20px',
              opacity: themePreference === 'system' ? 1 : 0.5,
            }}
          >
            A
          </Avatar>
          <div>{t('theme.system')}</div>
        </div>
      ),
      value: 'system' as ThemePreference,
    },
  ];

  return <Segmented defaultValue={'light'} options={options} size="small" onChange={onValueChange} block value={themePreference} />
}

export default ThemeSwitcher
