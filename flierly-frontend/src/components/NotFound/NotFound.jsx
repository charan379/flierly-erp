import useLocale from "@/locale/useLocale";
import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * NotFound component to display a 404 error page with a message and a button to navigate back to the homepage.
 *
 * @returns {JSX.Element} The rendered NotFound component.
 */
const NotFound = () => {
  const { translate } = useLocale(); // Using the custom hook to get translation function
  const navigate = useNavigate(); // Using useNavigate to programmatically navigate

  return (
    // Result component from Ant Design to display the 404 error page
    <Result
      status="404" // Status code for the error page
      title={translate("error_404")} // Translated title
      subTitle={translate("sorry_the_page_you_requested_does_not_exist")} // Translated subtitle
      extra={
        <Button
          type="primary" // Primary type button
          onClick={() => {
            navigate("/"); // Navigate to the homepage on button click
          }}
        >
          {translate("back")} {/* Translated button text */}
        </Button>
      }
    />
  );
};

export default NotFound;
