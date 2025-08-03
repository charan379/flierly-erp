import React from 'react'
import { InfoCircleOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import Loading from '@/modules/core/components/Loading'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'
import vr from '@/modules/core/utils/get-validation-regex.util'
import { Link } from 'react-router-dom'

interface FormValues {
  username: string
  email: string
  password: string
  confirm_password: string
  terms: boolean
}

/**
 *  SignUpForm component to display a sign-up form with username, email, phone number, and password fields.
 */
const SignUpForm: React.FC = () => {
  const { translate: t, langDirection } = useLocale() // Using custom hook to get translation function and language direction.

  return (
    <Loading isLoading={false}>
      {/* Form */}
      <Form<FormValues>
        layout="vertical"
        name="sign_up"
        className="auth-form sign-up-form"
        initialValues={{
          terms: false,
        }}
        size="middle"
        onFinish={(values) => {
          console.log('Submitted values:', values)
        }}
      >
        {/* Form Fields */}
        <div style={{ direction: langDirection }}>
          {/* Username */}
          <Form.Item
            label={t('auth.username')}
            name="username"
            rules={[
              { required: true, message: t('auth.username.required') },
              { pattern: vr("username"), message: t('auth.username.invalid') },
            ]}
            tooltip={{
              title: t('auth.username.required'),
              icon: <InfoCircleOutlined />,
            }}
            hasFeedback
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('auth.username')} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={t('auth.email')}
            name="email"
            rules={[{ required: true, message: t('auth.email.required') }, { type: 'email', message: t('auth.email.invalid') }]}
            hasFeedback
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t('auth.email')} type="email" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={t('auth.mobile')}
            name="mobile"
            rules={[
              { required: true, message: t('auth.mobile.required') },
              { type: 'string' },
              { pattern: vr('mobile'), message: t('auth.mobile.invalid') },
            ]}
            hasFeedback
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder={t('auth.mobile')} type="string" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={t('auth.password')}
            name="password"
            rules={[
              { required: true, message: t('auth.password.required') },
              { pattern: vr("password"), message: t('auth.password.invalid') },
            ]}
            tooltip={{
              title: t('auth.password.required'),
              icon: <InfoCircleOutlined />,
            }}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={t('auth.password')} />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label={t('auth.confirm_password')}
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: t('auth.confirm_password.required') },
              { pattern: vr('password'), message: t('auth.confirm_password.invalid') },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error(t('auth.confirm_password.mismatch')))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={t('auth.confirm_password')} />
          </Form.Item>

          {/* Accept Terms and Conditions */}
          <Flex justify="space-between">
            <Form.Item
              name="terms"
              valuePropName="checked"
              noStyle
              rules={[
                {
                  validator: async (_, value) => (value ? Promise.resolve() : Promise.reject(new Error(t('text.terms_and_conditions_must_be_accepted')))),
                },
              ]}
            >
              <Checkbox>{t('text.accept_terms_conditions')}</Checkbox>
            </Form.Item>
            <a id="sign-up-form-terms" href="/terms-conditions-and-usage-policy" style={{ marginLeft: langDirection === 'rtl' ? '220px' : undefined }}>
              {t('link.terms_and_conditions')}
            </a>
          </Flex>
        </div>

        {/* Form Submission */}
        <Form.Item style={{ margin: '5px 0px 5px 0px' }}>
          <Button type="primary" htmlType="submit" className="auth-form-button" loading={false}>
            {t('button.signin')}
          </Button>
          {t('text.or')} <Link to={"/auth/login"}>{t('link.signin')}</Link>
        </Form.Item>
      </Form>
    </Loading>
  )
}

export default SignUpForm
