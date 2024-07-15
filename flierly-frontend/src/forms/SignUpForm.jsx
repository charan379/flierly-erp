import Loading from '@/components/Loading';
import useLocale from '@/redux/locale/useLocale'
import { InfoCircleOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';


/**
 *  SignUpFrom component to display a sign-up form with username, email, phone number and password fields.
 * 
 * @returns {JSX.Element} The rendered SignUpForm component.
 */
const SignUpForm = () => {
    const { translate, langDirection } = useLocale(); // Using custom hook to get translation function and language direction.
    const navigate = useNavigate();

    return (
        <Loading isLoading={false}>
            {/* form */}
            <Form
                layout='vertical'
                name='sign_up'
                className='auth-form sign-up-form'
                initialValues={{
                    terms: true
                }}
                onFinish={() => console.log("onFinish completed")}
            >
                {/* form fiedls */}
                <div style={{ direction: langDirection }} /* Setting text direction based on language */ >
                    {/* Username */}
                    <Form.Item
                        label={translate("username")} // Translated label for username filed
                        name='username' // Name of the form field
                        rules={[// Validation rules
                            { required: true, message: translate("username_is_required") },
                            { type: 'string' }
                        ]}
                        tooltip={{
                            title: translate("username_is_required"), // Tooltip text
                            icon: <InfoCircleOutlined />, // Tooltip icon
                        }}
                    >
                        <Input
                            prefix={<UserOutlined className='site-form-item-icon' />} // Prefix icon for the input field
                            placeholder={translate("username")}
                            size='large' // Size of the input field
                        />
                    </Form.Item>
                    {/* Email */}
                    <Form.Item
                        label={translate("email")} // Translated label for email field
                        name="email" // Name of the form field
                        rules={[ // Validation rules
                            { required: true, message: translate("email_is_required") },
                            { type: "email" }
                        ]}
                        tooltip={{
                            title: translate("email_is_required"), // Tooltip text
                            icon: <InfoCircleOutlined />, // Tooltip icon
                        }}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />} // Prefix icon for the input field
                            placeholder={translate("email")} // Translated placeholder text
                            type="email" // Input type
                            size="large" // Size of the input field
                        />
                    </Form.Item>
                    {/* password */}
                    <Form.Item
                        label={translate("password")} // Translated label for password field
                        name="password" // Name of the form field
                        rules={[ // Validation rules
                            { required: true, message: translate('password_is_required') }
                        ]}
                        tooltip={{
                            title: translate('password_is_required'), // Tooltip text
                            icon: <InfoCircleOutlined />, // Tooltip icon
                        }}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />} // Prefix icon for the password field
                            placeholder={translate("password")} // Translated placeholder text
                            size="large" // Size of the input field
                        />
                    </Form.Item>
                    {/* accept terms and conditions */}
                    <Form.Item>
                        {/* Terms checkbox */}
                        <Form.Item
                            name="terms"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>{translate("accept_terms_conditions")}</Checkbox>
                        </Form.Item>
                        {/*  */}
                        <a
                            className="float-right-line-normal-pt-2"
                            id='sign-up-form-terms'
                            href="/terms-conditions-and-usage-policy" // Link to terms & conditions page
                            style={{ marginLeft: langDirection === "rtl" ? "220px" : "0px" }} // Conditional margin based on language direction
                        >
                            {translate("terms_and_conditions")} {/* Translated link text */}
                        </a>
                        {/*  */}
                    </Form.Item>
                </div>
                {/* form submission */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="auth-form-button"
                        loading={false}
                        size="large"
                    >
                        {translate("sign_up")}
                    </Button>
                    {translate('or')} <a href="/login"> {translate('login')} </a>
                </Form.Item>
            </Form>
        </Loading>
    )
}

export default SignUpForm