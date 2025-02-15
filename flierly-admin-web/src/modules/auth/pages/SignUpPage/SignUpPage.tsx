import React from 'react'
import AuthLayout from '../../layout/AuthLayout/AuthLayout'
import SignUpForm from '../../forms/SignUpForm'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

const SignUp: React.FC = () => {
  const { translate: t } = useLocale();
  return (
    <AuthLayout isForSignUp title={t('title.sign_up')}>
      <SignUpForm />
    </AuthLayout>
  )
}

export default SignUp
