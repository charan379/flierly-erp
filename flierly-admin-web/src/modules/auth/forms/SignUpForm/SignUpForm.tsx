import React from 'react'
import { InfoCircleOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import Loading from '@/modules/core/components/Loading'
import regexConstants from '@/modules/core/constants/validations.regex'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

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
            label={t('username')}
            name="username"
            rules={[
              { required: true, message: t('username_is_required') },
              { pattern: regexConstants.username, message: t('username_is_invalid') },
              { min: 5, max: 20 },
            ]}
            tooltip={{
              title: t('username_is_required'),
              icon: <InfoCircleOutlined />,
            }}
            hasFeedback
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('username')} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={t('email')}
            name="email"
            rules={[{ required: true, message: t('email_is_required') }, { type: 'email' }]}
            hasFeedback
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t('email')} type="email" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={t('mobile')}
            name="mobile"
            rules={[
              { required: true, message: t('mobile_is_required') },
              { type: 'string' },
              { pattern: regexConstants.mobile, message: t('mobile_is_invalid') },
            ]}
            hasFeedback
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder={t('mobile')} type="string" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={t('password')}
            name="password"
            rules={[
              { required: true, message: t('password_is_required') },
              { pattern: regexConstants.password, message: t('password_is_invalid') },
              { max: 28, min: 8 },
            ]}
            tooltip={{
              title: t('password_is_required'),
              icon: <InfoCircleOutlined />,
            }}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={t('password')} />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label={t('confirm_password')}
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: t('confirm_password_is_required') },
              { pattern: regexConstants.password, message: t('confirm_password_is_invalid') },
              { max: 28, min: 8 },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error(t('passwords_doesnt_match')))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={t('confirm_password')} />
          </Form.Item>

          {/* Accept Terms and Conditions */}
          <Flex justify="space-between">
            <Form.Item
              name="terms"
              valuePropName="checked"
              noStyle
              rules={[
                {
                  validator: async (_, value) => (value ? Promise.resolve() : Promise.reject(new Error(t('terms_and_conditions_must_be_accepted')))),
                },
              ]}
            >
              <Checkbox>{t('accept_terms_conditions')}</Checkbox>
            </Form.Item>
            <a id="sign-up-form-terms" href="/terms-conditions-and-usage-policy" style={{ marginLeft: langDirection === 'rtl' ? '220px' : undefined }}>
              {t('terms_and_conditions')}
            </a>
          </Flex>
        </div>

        {/* Form Submission */}
        <Form.Item style={{ margin: '5px 0px 5px 0px' }}>
          <Button type="primary" htmlType="submit" className="auth-form-button" loading={false}>
            {t('sign_up')}
          </Button>
          {t('or')} <a href="/login">{t('login')}</a>
        </Form.Item>
      </Form>
    </Loading>
  )
}

export default SignUpForm
