import SignUpForm from '@/forms/SignUpForm';
import AuthModule from '@/modules/Auth/AuthModule';
import React from 'react'

const Register = () => {
  return <AuthModule authForm={<SignUpForm />} AUTH_TITLE="sign_up" />;

}

export default Register