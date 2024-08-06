import AuthLayout from "./layouts/AuthLayout"; // Importing AuthLayout component
import React from "react"; // Importing React
import SideContent from "./components/SideContent"; // Importing SideContent component
import { Layout, Typography, Col, Divider } from "antd"; // Importing Ant Design components
import useLocale from "@/locale/useLocale"; // Importing custom hook for locale management

const { Content } = Layout; // Destructuring Content from Layout
const { Title } = Typography; // Destructuring Title from Typography

/**
 * AuthModule component to display authentication forms with layout and localization.
 * 
 * @param {Object} props - Props passed to the component.
 * @param {React.ReactNode} props.authForm - The authentication form component to render.
 * @param {string} props.AUTH_TITLE - The title of the authentication form.
 * @param {boolean} [props.isForSignUp=false] - Flag to adjust padding for signup form.
 * @returns {JSX.Element} The rendered AuthModule component.
 */
const AuthModule = ({ authForm, AUTH_TITLE, isForSignUp = false }) => {
  const { translate } = useLocale(); // Using the custom hook to get translation function

  return (
    // Wrapping the content with AuthLayout
    <AuthLayout rightSideContent={<SideContent />}>
      <Content
        style={{
          padding: isForSignUp ? "40px 30px 30px" : "100px 30px 30px", // Conditional padding based on isForSignUp prop
          maxWidth: "440px", // Maximum width of the content
          margin: "0 auto", // Centering the content
        }}
      >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
          <img
            src="/vite.svg" // Source of the image
            alt="Flierly" // Alt text for the image
            style={{
              margin: "0px auto 20px", // Centering the image with margin
              display: "block", // Display as block element
            }}
            height={63} // Height of the image
            width={220} // Width of the image
          />
          <div className="space10" /> {/* Spacer element */}
        </Col>
        <Title level={1}>{translate(AUTH_TITLE)}</Title> {/* Translated title */}
        <Divider /> {/* Divider element */}
        <div className="site-layout-content">{authForm}</div> {/* Rendering the authentication form */}
      </Content>
    </AuthLayout>
  );
};

export default AuthModule; // Exporting the component as default