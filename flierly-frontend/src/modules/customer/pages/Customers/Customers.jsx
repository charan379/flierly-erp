import React from "react";
import CustomerLayout from "../../layout/CustomerLayout";
import TestPage from "@/pages/TestPage";
import useLocale from "@/locale/useLocale";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import { generate as uniqueId } from "shortid";
import { PageHeader, ProTable } from "@ant-design/pro-components";
import enUs from "antd/locale/en_US";

const Customers = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <CustomerLayout header={<Header />}>
      {/* https://procomponents.ant.design/en-US/components/table */}
      <ProTable
        search={false}
        
        columnsState={{
          persistenceType: "localStorage",
          persistenceKey: "cusla",
        }}
        columns={columns}
        dataSource={data}
        options={{
          density: false,
          fullScreen: true,
          search: false,
          setting: true,
        }}
        key={"key"}
      />
    </CustomerLayout>
  );
};

const Header = () => {
  const { langDirection, translate } = useLocale();
  return (
    <PageHeader
      onBack={() => window.history.back()}
      backIcon={
        langDirection === "rtl" ? <ArrowRightOutlined /> : <ArrowLeftOutlined />
      }
      title={"Customer Layout"}
      extra={[
        <Input
          key={`searchFilterDataTable}`}
          placeholder={translate("search")}
          allowClear
        />,
        <Button key={`${uniqueId()}`} icon={<RedoOutlined />}>
          {translate("refresh")}
        </Button>,
      ]}
    />
  );
};

export default Customers;
