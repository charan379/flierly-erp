import React from 'react'
import useLocale from '@/features/Locale/hooks/useLocale'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const { translate } = useLocale() // Custom hook for translations
  const navigate = useNavigate() // Hook for navigation

  return (
    // Ant Design's Result component for 404 error page
    <Result
      status="404" // HTTP status for not found
      title={translate('error_404')} // Display translated title
      subTitle={translate('sorry_the_page_you_requested_does_not_exist')} // Display translated subtitle
      extra={
        <Button
          type="primary" // Button styling as primary
          onClick={() => {
            console.log('Navigate button clicked, redirecting to previous page')
            navigate(-1) // Navigate to the previous page on click
          }}
        >
          {translate('back')} {/* Translated button text */}
        </Button>
      }
    />
  )
}

export default NotFound
