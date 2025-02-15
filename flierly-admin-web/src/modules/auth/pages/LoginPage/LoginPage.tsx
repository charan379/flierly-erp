import React from 'react'
import AuthLayout from '../../layout/AuthLayout/AuthLayout'
import LoginForm from '../../forms/LoginForm'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

const LoginPage: React.FC = () => {
  const { translate: t } = useLocale();
  return (
    <AuthLayout isForSignUp={false} title={t('title.sign_in')}>
      <LoginForm redirectOnLogin />
    </AuthLayout>
  )
}

export default LoginPage
