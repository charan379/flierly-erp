import React from 'react'
import { Select } from 'antd'
import languageOptions from '../../config/language-options'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import useResponsive from '@/modules/core/hooks/useResponsive'
import useLocale from '../../hooks/useLocale'

const LangSelector: React.FC = () => {
  const { isMobile } = useResponsive()
  const { langCode, setLanguage } = useLocale()

  return (
    <Select
      showSearch
      defaultValue={langCode}
      loading={false}
      options={languageOptions()}
      suffixIcon={<FontAwesomeIcon icon={faLanguage} size='2x' />}
      onChange={(newLangCode: string) => setLanguage(newLangCode)}
      filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
      filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
      style={{
        width: isMobile ? '90px' : '110px',
        float: 'right',
        cursor: 'pointer',
        direction: 'ltr',
      }}
      size="middle"
    />
  )
}

export default LangSelector
