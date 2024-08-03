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
import { calc } from "antd/es/theme/internal";

const Customers = () => {
  const { langDirection, translate } = useLocale();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      copyable: true,
      width: 100,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 30,
      fixed: true,
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 100,
    },
    {
      width: 100,
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
    {
      width: 100,
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
    {
      key: "4",
      name: "Jane White",
      age: 28,
      address: "Toronto No. 1 Lake Park",
      tags: ["smart", "designer"],
    },
    {
      key: "5",
      name: "Jake Blue",
      age: 36,
      address: "Berlin No. 1 Lake Park",
      tags: ["experienced", "manager"],
    },
    {
      key: "6",
      name: "Julia Brown",
      age: 29,
      address: "Paris No. 1 Lake Park",
      tags: ["innovative", "engineer"],
    },
    {
      key: "7",
      name: "Jason Grey",
      age: 45,
      address: "Tokyo No. 1 Lake Park",
      tags: ["dedicated", "architect"],
    },
    {
      key: "8",
      name: "Jasmine Green",
      age: 33,
      address: "Dubai No. 1 Lake Park",
      tags: ["charismatic", "sales"],
    },
    {
      key: "9",
      name: "Jordan Red",
      age: 38,
      address: "Madrid No. 1 Lake Park",
      tags: ["meticulous", "analyst"],
    },
    {
      key: "10",
      name: "Jerry Pink",
      age: 41,
      address: "Rome No. 1 Lake Park",
      tags: ["strategic", "consultant"],
    },
    {
      key: "11",
      name: "James Violet",
      age: 31,
      address: "San Francisco No. 1 Lake Park",
      tags: ["creative", "writer"],
    },
    {
      key: "12",
      name: "Jessica Orange",
      age: 27,
      address: "Amsterdam No. 1 Lake Park",
      tags: ["efficient", "administrator"],
    },
    {
      key: "13",
      name: "Jacob Silver",
      age: 35,
      address: "Brussels No. 1 Lake Park",
      tags: ["analytic", "data scientist"],
    },
    {
      key: "14",
      name: "Jill Gold",
      age: 30,
      address: "Munich No. 1 Lake Park",
      tags: ["resourceful", "product manager"],
    },
    {
      key: "15",
      name: "Jared Blue",
      age: 40,
      address: "Zurich No. 1 Lake Park",
      tags: ["strategic", "planner"],
    },
    {
      key: "16",
      name: "Joan White",
      age: 29,
      address: "Stockholm No. 1 Lake Park",
      tags: ["adaptable", "researcher"],
    },
    {
      key: "17",
      name: "Jonathan Black",
      age: 34,
      address: "Vienna No. 1 Lake Park",
      tags: ["innovative", "entrepreneur"],
    },
    {
      key: "18",
      name: "Janet Pink",
      age: 39,
      address: "Lisbon No. 1 Lake Park",
      tags: ["detail-oriented", "accountant"],
    },
    {
      key: "19",
      name: "Jack Red",
      age: 42,
      address: "Helsinki No. 1 Lake Park",
      tags: ["leader", "CEO"],
    },
    {
      key: "20",
      name: "Joy Brown",
      age: 26,
      address: "Oslo No. 1 Lake Park",
      tags: ["quick learner", "intern"],
    },
    {
      key: "21",
      name: "Jeremy Green",
      age: 37,
      address: "Prague No. 1 Lake Park",
      tags: ["visionary", "director"],
    },
    {
      key: "22",
      name: "Jocelyn Purple",
      age: 33,
      address: "Athens No. 1 Lake Park",
      tags: ["creative", "marketer"],
    },
    {
      key: "23",
      name: "Javier Yellow",
      age: 28,
      address: "Budapest No. 1 Lake Park",
      tags: ["organized", "event planner"],
    },
    {
      key: "24",
      name: "Jennifer Grey",
      age: 36,
      address: "Warsaw No. 1 Lake Park",
      tags: ["analytical", "consultant"],
    },
    {
      key: "25",
      name: "Jeffrey Silver",
      age: 41,
      address: "Copenhagen No. 1 Lake Park",
      tags: ["efficient", "logistics manager"],
    },
    {
      key: "26",
      name: "Joyce Orange",
      age: 32,
      address: "Milan No. 1 Lake Park",
      tags: ["team player", "HR"],
    },
    {
      key: "27",
      name: "Joel Gold",
      age: 38,
      address: "Vienna No. 1 Lake Park",
      tags: ["innovative", "software developer"],
    },
    {
      key: "28",
      name: "Josephine Green",
      age: 30,
      address: "Bucharest No. 1 Lake Park",
      tags: ["dedicated", "nurse"],
    },
    {
      key: "29",
      name: "Jordan Blue",
      age: 29,
      address: "Dublin No. 1 Lake Park",
      tags: ["strategic", "analyst"],
    },
    {
      key: "30",
      name: "Judith White",
      age: 35,
      address: "Vienna No. 1 Lake Park",
      tags: ["creative", "graphic designer"],
    },
  ];

  return (
    <CustomerLayout header={<Header />}>
      {/* https://procomponents.ant.design/en-US/components/table */}
      <ProTable

        toolBarRender={(action) => [
          <Input
            key={`searchFilterDataTable}`}
            placeholder={translate("search")}
            allowClear
          />,
          <Button key={`${uniqueId()}`} icon={<RedoOutlined />}>
            {translate("refresh")}
          </Button>,
        ]}
        bordered={true}
        style={{
          width: "100%",
        }}
        scroll={{
          scrollToFirstRowOnChange: true,
          x: 1300,
          y: 250,
        }}
        search={false}
        columnsState={{
          persistenceType: "localStorage",
          persistenceKey: "cusla",
        }}
        pagination={{ pageSize: 20 }}
        size="large"
        columns={columns}
        dataSource={data}
        options={{
          density: false,
          fullScreen: true,
          search: false,
          setting: true,
        }}
        key={"key"}
        tableLayout="fixed"
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
      extra={
        [
          // <Input
          //   key={`searchFilterDataTable}`}
          //   placeholder={translate("search")}
          //   allowClear
          // />,
          // <Button key={`${uniqueId()}`} icon={<RedoOutlined />}>
          //   {translate("refresh")}
          // </Button>,
        ]
      }
    />
  );
};

export default Customers;
