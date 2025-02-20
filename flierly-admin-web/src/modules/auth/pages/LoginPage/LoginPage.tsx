import React from 'react'
import LoginForm from '../../forms/LoginForm'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import AuthFormCard from '../../components/AuthFormCard/AuthFormCard'

const LoginPage: React.FC = () => {
  const { translate: t } = useLocale();
  return (
    <AuthFormCard title={t('title.sign_in')}>
      <LoginForm redirectOnLogin />
    </AuthFormCard>
  )
}

export default LoginPage
