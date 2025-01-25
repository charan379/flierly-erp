import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import useLocale from '../../features/Locale/hooks/useLocale'

const UnAuthorized: React.FC = () => {
  const { translate: t } = useLocale() // Custom hook for translations
  const navigate = useNavigate() // Hook for navigation

  return (
    // Ant Design's Result component for 403 error page
    <Result
      status="403" // HTTP status for forbidden access
      title={t('error.title.403')} // Display translated title
      subTitle={t('error.message.403')} // Display translated subtitle
      extra={
        <Button
          type="primary" // Button styling as primary
          onClick={() => {
            console.log('Navigate button clicked, redirecting to home page')
            navigate(-1) // Navigate to home on click
          }}
        >
          {t('navigate.back')} {/* Translated button text */}
        </Button>
      }
    />
  )
}

export default UnAuthorized
