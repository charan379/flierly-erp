import React from 'react'
import SignUpForm from '../../forms/SignUpForm'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import AuthFormCard from '../../components/AuthFormCard/AuthFormCard'

const SignUp: React.FC = () => {
  const { translate: t } = useLocale();
  return (
    <AuthFormCard title={t('title.sign_up')}>
      <SignUpForm />
    </AuthFormCard>
  )
}

export default SignUp
