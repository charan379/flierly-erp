import useLocale from "@/features/Language/hooks/useLocale";
import { Divider, Layout, Space, Typography } from "antd";
import React from "react";

const { Content } = Layout;
const { Text, Title } = Typography;

/**
 * SideContent component to display localized content on the side of the page.
 *
 * @returns {JSX.Element} The rendered SideContent component.
 */
const SideContent = () => {
  const { translate, langDirection } = useLocale(); // Using the custom hook to get translation function and language direction

  return (
    <Content
      style={{
        padding: "100px 15px 15px", // Padding around the content
        width: "100%", // Full width
        maxWidth: "580px", // Maximum width of 400px
        margin: "0 auto", // Centering the content
      }}
      className="side-content" // Custom CSS class
    >
      <div style={{ width: "100%", background: "inherit" }}>
        <img
          src="/vite.svg" // Source of the image
          alt="Flierly" // Alt text for the image
          style={{ margin: "0 auto 40px", display: "block" }} // Centering the image with margin
          height={63} // Height of the image
          width={220} // Width of the image
        />
        <div className="space40"></div> {/* Spacer element */}
        <Title level={3}>{translate("manage_your_company_with")} :</Title>{" "}
        {/* Translated title */}
        <div className="space20"></div> {/* Spacer element */}
        <ul className="list-checked" style={{ paddingRight: 0 }}>
          <li
            className={`list-checked-item ${
              langDirection === "rtl"
                ? "list-checked-item-right"
                : "list-checked-item-left"
            }`} // Conditional class based on language direction
          >
            <Space direction="vertical">
              <Text strong>{translate("all_in_one_tool")}</Text>{" "}
              {/* Translated text */}
              <Text>{translate("run_and_scale_your_erp_crm_apps")}</Text>{" "}
              {/* Translated text */}
            </Space>
          </li>

          <li
            className={`list-checked-item ${
              langDirection === "rtl"
                ? "list-checked-item-right"
                : "list-checked-item-left"
            }`} // Conditional class based on language direction
          >
            <Space direction="vertical">
              <Text strong>
                {translate("easily_add_and_manage_your_services")}
              </Text>{" "}
              {/* Translated text */}
              <Text>
                {translate("it_brings_together_your_invoice_clients_and_leads")}
              </Text>{" "}
              {/* Translated text */}
            </Space>
          </li>
        </ul>
        <Divider /> {/* Divider element */}
      </div>
    </Content>
  );
};

export default SideContent;
