import React from 'react'
import AuthLayout from '../../layout/AuthLayout/AuthLayout'
import SignUpForm from '../../forms/SignUpForm'

const SignUp: React.FC = () => {
  return (
    <AuthLayout isForSignUp title="sign_up">
      <SignUpForm />
    </AuthLayout>
  )
}

export default SignUp
