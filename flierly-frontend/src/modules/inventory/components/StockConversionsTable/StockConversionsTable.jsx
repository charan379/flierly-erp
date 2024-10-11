import { Card, Descriptions, Table } from "antd";
import React from "react";

const StockConversionsTable = ({ data }) => {
  const columns = [
    {
      title: "To UOM",
      dataIndex: "toUom",
      key: "toUom",
    },
    {
      title: "Conversion Factor",
      dataIndex: "conversionFactor",
      key: "conversionFactor",
      render: (text) => parseFloat(text).toLocaleString(),
    },
    {
      title: "Converted Quantity",
      dataIndex: "convertedQuantity",
      key: "convertedQuantity",
    },
  ];

  const conversions = data?.conversions ?? [];

  return (
    <Card style={{ width: "100%" }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Default UOM">
          {data.defaultUom}
        </Descriptions.Item>
        <Descriptions.Item label="Default Quantity">
          {data.defaultQuantity}
        </Descriptions.Item>
      </Descriptions>

      <Table
        style={{ marginTop: 24 }}
        columns={columns}
        rowKey={"id"}
        dataSource={conversions}
        pagination={false}
        bordered
        title={() => "Conversions"}
      />
    </Card>
  );
};

export default StockConversionsTable;
