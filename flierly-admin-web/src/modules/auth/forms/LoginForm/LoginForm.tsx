import React, { useEffect } from 'react'
import { InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import Loading from '@/modules/core/components/Loading'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { LoadingTypes } from '../../constants/loading.enum'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import vr from '@/modules/core/utils/get-validation-regex.util'

interface LoginFormProps {
  redirectOnLogin?: boolean
  isForPopup?: boolean
  onLoginSuccess?: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectOnLogin = false, isForPopup = false, onLoginSuccess }) => {
  const { translate: t, langDirection } = useLocale()
  const { loading, login, isLoggedIn, tokenExpiresAt, } = useAuth()
  const navigate = useNavigate()

  const callbackParam = new URLSearchParams(window.location.search).get('callback')
  const callback = callbackParam ? JSON.parse(callbackParam || '{}') : null

  // Convert token expiration date to Date object
  const tokenExpiresAtDateTime = new Date(tokenExpiresAt)
  const currentDateTime = new Date()
  const isTokenExpired = tokenExpiresAtDateTime < currentDateTime

  useEffect(() => {
    if (redirectOnLogin && !isForPopup && loading === LoadingTypes.SUCCEEDED && isLoggedIn && !isTokenExpired) {
      const targetPath = callback?.pathname ? { pathname: callback.pathname, search: callback.search } : '/erp'
      navigate(targetPath, { replace: true })
    }

    return () => { }
  }, [isLoggedIn, loading, navigate, redirectOnLogin, isForPopup, callback, isTokenExpired, onLoginSuccess])

  return (
    <Loading isLoading={loading === LoadingTypes.PENDING}>
      <Form
        layout="vertical"
        name="login"
        className="auth-form"
        id="login-form"
        size="middle"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          login(values).then(() => onLoginSuccess?.()
          )
        }}
      >
        <div style={{ direction: langDirection }}>
          <Form.Item
            label={t('auth.username')}
            name="username"
            rules={[
              { required: true, message: t('auth.username.required') },
              { pattern: vr('username'), message: t('auth.username.invalid') }
            ]}
            tooltip={{
              title: t('auth.username.required'),
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('auth.username')} />
          </Form.Item>

          <Form.Item
            label={t('auth.password')}
            name="password"
            rules={[
              { required: true, message: t('auth.password.required') },
              { pattern: vr('password'), message: 'auth.password.invalid' },
            ]}
            tooltip={{
              title: t('auth.password.required'),
              icon: <InfoCircleOutlined />,
            }}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={t('auth.password')} />
          </Form.Item>

          {!isForPopup ? (
            <Flex justify="space-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('text.remember_me')}</Checkbox>
              </Form.Item>
              <a
                id="login-form-forgot"
                href="/forgetpassword"
                style={{
                  marginLeft: langDirection === 'rtl' ? '220px' : undefined,
                }}
              >
                {t('link.forgot_password')}
              </a>
            </Flex>
          ) : null}
        </div>

        <Form.Item style={{ margin: '5px 0px 5px 0px' }}>
          <Button type="primary" htmlType="submit" className="auth-form-button" loading={loading === LoadingTypes.PENDING}>
            {t('button.signin')}
          </Button>

          {!isForPopup ? (
            <>
              {t('text.or')} <a href="/register">{t('link.signup')}</a>
            </>
          ) : null}
        </Form.Item>
      </Form>
    </Loading>
  )
}

export default LoginForm
