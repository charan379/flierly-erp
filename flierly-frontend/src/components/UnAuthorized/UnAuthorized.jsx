import React from 'react'
import useLocale from "@/features/Language/hooks/useLocale";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
    const { translate } = useLocale(); // Using the custom hook to get translation function
    const navigate = useNavigate(); // Using useNavigate to programmatically navigate

    return (
        // Result component from Ant Design to display the 403 error page
        <Result
            status="403" // Status code for the error page
            title={translate("error_403")} // Translated title
            subTitle={translate("sorry_your_not_authorized_to_access_this_page")} // Translated subtitle
            // extra={
            //     <Button
            //         type="primary" // Primary type button
            //         onClick={() => {
            //             navigate('/'); // Navigate back on button click
            //         }}
            //     >
            //         {translate("back")} {/* Translated button text */}
            //     </Button>
            // }
        />
    );

}

export default UnAuthorized;