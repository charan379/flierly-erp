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
  const { translate, langDirection } = useLocale() // Using custom hook to get translation function and language direction.

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
            label={translate('username')}
            name="username"
            rules={[
              { required: true, message: translate('username_is_required') },
              { pattern: regexConstants.username, message: 'invalid_username' },
              { min: 5, max: 20 },
            ]}
            tooltip={{
              title: translate('username_is_required'),
              icon: <InfoCircleOutlined />,
            }}
            hasFeedback
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={translate('username')} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={translate('email')}
            name="email"
            rules={[{ required: true, message: translate('email_is_required') }, { type: 'email' }]}
            hasFeedback
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={translate('email')} type="email" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={translate('mobile')}
            name="mobile"
            rules={[
              { required: true, message: translate('email_is_required') },
              { type: 'string' },
              { pattern: regexConstants.mobile, message: 'invalid_mobile' },
            ]}
            hasFeedback
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder={translate('mobile')} type="string" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={translate('password')}
            name="password"
            rules={[
              { required: true, message: translate('password_is_required') },
              { pattern: regexConstants.password, message: 'invalid_password' },
              { max: 28, min: 8 },
            ]}
            tooltip={{
              title: translate('password_is_required'),
              icon: <InfoCircleOutlined />,
            }}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={translate('password')} />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label={translate('confirm_password')}
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: translate('confirm_password_is_required') },
              { pattern: regexConstants.password, message: 'invalid_password' },
              { max: 28, min: 8 },
              ({ getFieldValue }) => ({
                async validator(_, value) {
                  return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error(translate('passwords_doesnt_match')))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={translate('confirm_password')} />
          </Form.Item>

          {/* Accept Terms and Conditions */}
          <Flex justify="space-between">
            <Form.Item
              name="terms"
              valuePropName="checked"
              noStyle
              rules={[
                {
                  validator: async (_, value) => (value ? Promise.resolve() : Promise.reject(new Error(translate('terms_and_conditions_must_be_accepted')))),
                },
              ]}
            >
              <Checkbox>{translate('accept_terms_conditions')}</Checkbox>
            </Form.Item>
            <a id="sign-up-form-terms" href="/terms-conditions-and-usage-policy" style={{ marginLeft: langDirection === 'rtl' ? '220px' : undefined }}>
              {translate('terms_and_conditions')}
            </a>
          </Flex>
        </div>

        {/* Form Submission */}
        <Form.Item style={{ margin: '5px 0px 5px 0px' }}>
          <Button type="primary" htmlType="submit" className="auth-form-button" loading={false}>
            {translate('sign_up')}
          </Button>
          {translate('or')} <a href="/login">{translate('login')}</a>
        </Form.Item>
      </Form>
    </Loading>
  )
}

export default SignUpForm
