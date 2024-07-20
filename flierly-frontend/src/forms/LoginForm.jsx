import React from "react";
import useLocale from "@/locale/useLocale";
import {
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";

/**
 * LoginForm component to display a login form with email and password fields.
 * 
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm = () => {
  const { translate, langDirection } = useLocale(); // Using the custom hook to get translation function and language direction
  const navigate = useNavigate();
  return (
    <Loading isLoading={false}>
      {/* form */}
      <Form
        layout="vertical"
        name="login"
        className="auth-form"
        id="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={() => console.log("onFinish completed")}
      >
        {/* form fields */}
        <div style={{ direction: langDirection }}> {/* Setting text direction based on language */}
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
          {/* remember me with password reset link */}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle required  /* Remember me checkbox */>
              <Checkbox>{translate("remember_me")}</Checkbox>
            </Form.Item>
            {/*  */}
            <a
              className="float-right-line-normal-pt-2" // CSS class for the forgot password link
              id="login-form-forgot"
              href="/forgetpassword" // Link to forgot password page
              style={{ marginLeft: langDirection === "rtl" ? "220px" : "0px" }} // Conditional margin based on language direction
            >
              {translate("forgot_password")} {/* Translated link text */}
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
            {translate("sign_in")}
          </Button>
          {translate('or')} <a href="/register"> {translate('register_now')} </a>
        </Form.Item>
      </Form>
    </Loading>
  );
};

export default LoginForm;
