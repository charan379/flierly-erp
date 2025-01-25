import React from 'react'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LayoutFilled } from '@ant-design/icons'

const UnderConstruction: React.FC = () => {
  const { translate: t } = useLocale() // Using the custom hook to get translation function
  const navigate = useNavigate() // Using useNavigate to programmatically navigate

  return (
    // Result component from Ant Design to display the UnderConstruction page
    <Result
      icon={<LayoutFilled />} // Displaying an icon
      status={'info'}
      title={t('info.title.UnderConstruction')} // Translated title
      subTitle={t('info.message.UnderConstruction')} // Translated subtitle
      extra={
        <Button
          type="primary" // Primary type button
          onClick={() => {
            console.log('Navigate button clicked, redirecting to home page')
            navigate(-1) // Navigate back on button click
          }}
        >
          {t('navigate.back')} {/* Translated button text */}
        </Button>
      }
    />
  )
}

export default UnderConstruction
