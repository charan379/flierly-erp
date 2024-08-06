import SignUpForm from '@/modules/auth/forms/SignUpForm';
import AuthModule from '@/modules/auth/AuthModule';
import React from 'react'

const Register = () => {
  return <AuthModule authForm={<SignUpForm />} AUTH_TITLE="sign_up" isForSignUp />;

}

export default Register