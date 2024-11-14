import React from 'react'
import useLocale from "@/features/Language/hooks/useLocale";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { LayoutFilled } from '@ant-design/icons';

const UnderConstruction = () => {
    const { translate } = useLocale(); // Using the custom hook to get translation function
    const navigate = useNavigate(); // Using useNavigate to programmatically navigate

    return (
        // Result component from Ant Design to display the UnderConstruction page
        <Result
            icon={<LayoutFilled />}
            status={'info'}
            title={translate("page_under_construction")} // Translated title
            subTitle={translate("sorry_the_page_you_requested_is_ynder_construction")} // Translated subtitle
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

export default UnderConstruction;