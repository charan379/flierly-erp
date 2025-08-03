import { Button, Result } from 'antd'
import React from 'react'
import useLocale from '../../features/Locale/hooks/useLocale'

// Define the types for the props
interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const { translate: t } = useLocale();
  return (
    <Result
      status="500"
      title={error?.name ?? t('title.error.500')}
      subTitle={error?.message ?? t('message.error.500')}
      extra={
        <Button type="primary" onClick={resetErrorBoundary}>
          {t('button.retry')}
        </Button>
      }
    />
  )
}

export default ErrorFallback
