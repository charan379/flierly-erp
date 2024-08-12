import React from "react";
import CustomerLayout from "../../layout/CustomerLayout";
import useLocale from "@/locale/useLocale";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-components";
import SignUpForm from "@/modules/auth/forms/SignUpForm";
import { CrudTable } from "@/features/CrudTable";
import columns from "../../config/customerColumns";
import AddCustomer from "../../forms/AddCustomer";

const Customers = () => {
  const { langDirection, translate } = useLocale();

  const data = [
    {
      _id: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      _id: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      _id: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      _id: "4",
      name: "Jane White",
      age: 28,
      address: "Toronto No. 1 Lake Park",
      tags: ["smart", "designer"],
    },
    {
      _id: "5",
      name: "Jake Blue",
      age: 36,
      address: "Berlin No. 1 Lake Park",
      tags: ["experienced", "manager"],
    },
    {
      _id: "6",
      name: "Julia Brown",
      age: 29,
      address: "Paris No. 1 Lake Park",
      tags: ["innovative", "engineer"],
    },
    {
      _id: "7",
      name: "Jason Grey",
      age: 45,
      address: "Tokyo No. 1 Lake Park",
      tags: ["dedicated", "architect"],
    },
    {
      _id: "8",
      name: "Jasmine Green",
      age: 33,
      address: "Dubai No. 1 Lake Park",
      tags: ["charismatic", "sales"],
    },
    {
      _id: "9",
      name: "Jordan Red",
      age: 38,
      address: "Madrid No. 1 Lake Park",
      tags: ["meticulous", "analyst"],
    },
    {
      _id: "10",
      name: "Jerry Pink",
      age: 41,
      address: "Rome No. 1 Lake Park",
      tags: ["strategic", "consultant"],
    },
    {
      _id: "11",
      name: "James Violet",
      age: 31,
      address: "San Francisco No. 1 Lake Park",
      tags: ["creative", "writer"],
    },
    {
      _id: "12",
      name: "Jessica Orange",
      age: 27,
      address: "Amsterdam No. 1 Lake Park",
      tags: ["efficient", "administrator"],
    },
    {
      _id: "13",
      name: "Jacob Silver",
      age: 35,
      address: "Brussels No. 1 Lake Park",
      tags: ["analytic", "data scientist"],
    },
    {
      _id: "14",
      name: "Jill Gold",
      age: 30,
      address: "Munich No. 1 Lake Park",
      tags: ["resourceful", "product manager"],
    },
    {
      _id: "15",
      name: "Jared Blue",
      age: 40,
      address: "Zurich No. 1 Lake Park",
      tags: ["strategic", "planner"],
    },
    {
      _id: "16",
      name: "Joan White",
      age: 29,
      address: "Stockholm No. 1 Lake Park",
      tags: ["adaptable", "researcher"],
    },
    {
      _id: "17",
      name: "Jonathan Black",
      age: 34,
      address: "Vienna No. 1 Lake Park",
      tags: ["innovative", "entrepreneur"],
    },
    {
      _id: "18",
      name: "Janet Pink",
      age: 39,
      address: "Lisbon No. 1 Lake Park",
      tags: ["detail-oriented", "accountant"],
    },
    {
      _id: "19",
      name: "Jack Red",
      age: 42,
      address: "Helsinki No. 1 Lake Park",
      tags: ["leader", "CEO"],
    },
    {
      _id: "20",
      name: "Joy Brown",
      age: 26,
      address: "Oslo No. 1 Lake Park",
      tags: ["quick learner", "intern"],
    },
    {
      _id: "21",
      name: "Jeremy Green",
      age: 37,
      address: "Prague No. 1 Lake Park",
      tags: ["visionary", "director"],
    },
    {
      _id: "22",
      name: "Jocelyn Purple",
      age: 33,
      address: "Athens No. 1 Lake Park",
      tags: ["creative", "marketer"],
    },
    {
      _id: "23",
      name: "Javier Yellow",
      age: 28,
      address: "Budapest No. 1 Lake Park",
      tags: ["organized", "event planner"],
    },
    {
      _id: "24",
      name: "Jennifer Grey",
      age: 36,
      address: "Warsaw No. 1 Lake Park",
      tags: ["analytical", "consultant"],
    },
    {
      _id: "25",
      name: "Jeffrey Silver",
      age: 41,
      address: "Copenhagen No. 1 Lake Park",
      tags: ["efficient", "logistics manager"],
    },
    {
      _id: "26",
      name: "Joyce Orange",
      age: 32,
      address: "Milan No. 1 Lake Park",
      tags: ["team player", "HR"],
    },
    {
      _id: "27",
      name: "Joel Gold",
      age: 38,
      address: "Vienna No. 1 Lake Park",
      tags: ["innovative", "software developer"],
    },
    {
      _id: "28",
      name: "Josephine Green",
      age: 30,
      address: "Bucharest No. 1 Lake Park",
      tags: ["dedicated", "nurse"],
    },
    {
      _id: "29",
      name: "Jordan Blue",
      age: 29,
      address: "Dublin No. 1 Lake Park",
      tags: ["strategic", "analyst"],
    },
    {
      _id: "30",
      name: "Judith White",
      age: 35,
      address: "Vienna No. 1 Lake Park",
      tags: ["creative", "graphic designer"],
    },
  ];

  return (
    <CustomerLayout header={<Header />}>
      {/* https://procomponents.ant.design/en-US/components/table */}
      <CrudTable
        columns={columns}
        dataSource={data}
        tableKey={"customer-table"}
        rowKey="_id"
        createFormFields={<AddCustomer />}
        createFormInitialValues={{ tags: ["gold"] }}
        searchFormFields={<SignUpForm />}
        searchFormInitialValues={{ tags: ["gold"] }}
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
      extra={[]}
    />
  );
};

export default Customers;
