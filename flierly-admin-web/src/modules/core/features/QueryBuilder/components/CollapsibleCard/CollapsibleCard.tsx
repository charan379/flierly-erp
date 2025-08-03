import React, { forwardRef } from 'react'
import { Collapse, Space } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'

type CollapsibleCardProps = {
  title: React.ReactNode | string // Title content as a prop
  children: React.ReactNode // Body content as a prop
  actions?: React.ReactNode[] // Additional actions on the top-right
}

// Using forwardRef to forward the ref to the underlying Collapse component
const CollapsibleCard = forwardRef<HTMLDivElement, CollapsibleCardProps>(({ title, children, actions }, ref) => {
  return (
    <Collapse
      ref={ref} // Forward the ref to the Collapse component
      expandIconPosition="start"
      defaultActiveKey={1}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? 90 : 0}
          style={{
            fontSize: '18px',
            color: '#1890ff',
            alignSelf: 'center',
            marginRight: '8px',
          }}
        />
      )}
      items={[
        {
          key: '1',
          label: (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 500 }}>{title}</span>
              <Space size="small">{actions}</Space>
            </div>
          ),
          children: children,
          styles: {
            header: { alignItems: 'center' },
          },
        },
      ]}
    />
  )
})

// Add displayName for debugging purposes
CollapsibleCard.displayName = 'CollapsibleCard'

export default CollapsibleCard
