import React from 'react'
import { Divider, Layout, Space, Typography } from 'antd'
import useLocale from '@/modules/core/features/Locale/hooks/useLocale'

const { Content } = Layout
const { Text, Title } = Typography

/**
 * SideContent component to display localized content on the side of the page.
 */
const SideContent: React.FC = () => {
  const { translate: t, langDirection } = useLocale()

  const listItems = [
    {
      line1: t('text.all_in_one_tool'),
      line2: t('text.run_and_scale_your_erp_crm_apps'),
    },
    {
      line1: t('text.easily_add_and_manage_your_services'),
      line2: t('text.it_brings_together_your_invoice_clients_and_leads'),
    },
  ]

  return (
    <Content
      style={{
        width: '100%',
        height: "100%",
        margin: '0 auto',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "20px",
      }}
      className="side-content"
    >
      <div style={{ width: '100%', background: 'inherit', padding: "20px", height: "100%", borderRadius: "10px" }}>
        <img src="/vite.svg" alt="Flierly" style={{ margin: '0 auto 40px', display: 'block' }} height={63} width={220} />

        <Title level={3}>{t('title.manage_your_company_with')}:</Title>

        <ul className="list-checked" style={{ paddingRight: 0 }}>
          {listItems.map(({ line1, line2 }, index) => (
            <li key={index} className={`list-checked-item ${langDirection === 'rtl' ? 'list-checked-item-right' : 'list-checked-item-left'}`}>
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
  )
}

export default SideContent
