import React from 'react'
import useLocale from '@/features/Locale/hooks/useLocale'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const { translate: t } = useLocale() // Custom hook for translations
  const navigate = useNavigate() // Hook for navigation

  return (
    // Ant Design's Result component for 404 error page
    <Result
      status="404" // HTTP status for not found
      title={t('error.title.404')} // Display translated title
      subTitle={t('error.message.404')} // Display translated subtitle
      extra={
        <Button
          type="primary" // Button styling as primary
          onClick={() => {
            console.log('Navigate button clicked, redirecting to previous page')
            navigate(-1) // Navigate to the previous page on click
          }}
        >
          {t('navigate.back')} {/* Translated button text */}
        </Button>
      }
    />
  )
}

export default NotFound
