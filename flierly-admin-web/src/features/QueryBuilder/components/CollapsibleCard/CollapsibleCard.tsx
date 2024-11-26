import React from "react";
import { Collapse, Space } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

type CollapsibleCardProps = {
    title: React.ReactNode | string; // Title content as a prop
    children: React.ReactNode; // Body content as a prop
    actions?: React.ReactNode[]; // Additional actions on the top-right
};

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ title, children, actions }) => {
    return (
        <Collapse
            expandIconPosition="start"
            expandIcon={({ isActive }) => (
                <CaretRightOutlined
                    rotate={isActive ? 90 : 0}
                    style={{
                        fontSize: "18px",
                        color: "#1890ff",
                        alignSelf: "center",
                        marginRight: "8px",
                    }}
                />
            )}
            items={[
                {
                    key: "1",
                    label:
                        <React.Fragment>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontWeight: 500 }}>{title}</span>
                                <Space size="small">{actions}</Space>
                            </div>
                        </React.Fragment>,
                    children: children,
                    styles: {
                        header: { alignItems: "center" }
                    }
                }
            ]}
        />
    );
};

export default CollapsibleCard;
