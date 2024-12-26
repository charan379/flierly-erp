import React from 'react'
import useLocale from '@/features/Locale/hooks/useLocale'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const UnAuthorized: React.FC = () => {
  const { translate } = useLocale() // Custom hook for translations
  const navigate = useNavigate() // Hook for navigation

  return (
    // Ant Design's Result component for 403 error page
    <Result
      status="403" // HTTP status for forbidden access
      title={translate('error_403')} // Display translated title
      subTitle={translate('sorry_your_not_authorized_to_access_this_page')} // Display translated subtitle
      extra={
        <Button
          type="primary" // Button styling as primary
          onClick={() => {
            console.log('Navigate button clicked, redirecting to home page')
            navigate(-1) // Navigate to home on click
          }}
        >
          {translate('back')} {/* Translated button text */}
        </Button>
      }
    />
  )
}

export default UnAuthorized
