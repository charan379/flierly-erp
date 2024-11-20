import React from "react";
import useLocale from "@/features/Locale/hooks/useLocale";
import { Divider, Layout, Space, Typography } from "antd";

const { Content } = Layout;
const { Text, Title } = Typography;

/**
 * SideContent component to display localized content on the side of the page.
 */
const SideContent: React.FC = () => {
  const { translate, langDirection } = useLocale();

  const listItems = [
    {
      line1: translate("all_in_one_tool"),
      line2: translate("run_and_scale_your_erp_crm_apps"),
    },
    {
      line1: translate("easily_add_and_manage_your_services"),
      line2: translate("it_brings_together_your_invoice_clients_and_leads"),
    },
  ];

  return (
    <Content
      style={{
        padding: "100px 15px 15px",
        width: "100%",
        maxWidth: "580px",
        margin: "0 auto",
      }}
      className="side-content"
    >
      <div style={{ width: "100%", background: "inherit" }}>
        <img
          src="/vite.svg"
          alt="Flierly"
          style={{ margin: "0 auto 40px", display: "block" }}
          height={63}
          width={220}
        />

        <Title level={3}>{translate("manage_your_company_with")}:</Title>

        <ul className="list-checked" style={{ paddingRight: 0 }}>
          {listItems.map(({ line1, line2 }, index) => (
            <li
              key={index}
              className={`list-checked-item ${
                langDirection === "rtl"
                  ? "list-checked-item-right"
                  : "list-checked-item-left"
              }`}
            >
              <Space direction="vertical">
                <Text strong>{line1}</Text>
                <Text>{line2}</Text>
              </Space>
            </li>
          ))}
        </ul>

        <Divider />
      </div>
    </Content>
  );
};

export default SideContent;
