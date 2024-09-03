import { Tag } from "antd";

const userColumns = [
  // {
  //   title: "index",
  //   dataIndex: "index",
  //   valueType: "indexBorder",
  //   width: 15,
  // },
  {
    title: "DocId",
    dataIndex: "_id",
    hideInTable: true,
    width: 0,
  },
  {
    title: "Deleted",
    dataIndex: "isDeleted",
    hideInTable: true,
    width: 0,
  },
  {
    title: "Username",
    dataIndex: "username",
    copyable: true,
    width: 20,
  },
  {
    title: "Active",
    dataIndex: "isActive",
    width: 10,
    align: "center",
    render: (text, record, index, action) => {
      return text === false ? (
        <Tag color="red">InActive</Tag>
      ) : (
        <Tag color="green">Active</Tag>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    copyable: true,
    width: 20,
  },
  {
    title: "Phone",
    dataIndex: "mobile",
    copyable: true,
    width: 20,
  },
  {
    title: "Roles",
    dataIndex: "roles",
    copyable: true,
    width: 20,
  },
  {
    title: "Additional Access",
    dataIndex: "additionalPrivileges",
    copyable: true,
    width: 20,
  },
  {
    title: "Restricted Access",
    dataIndex: "restrictedPrivileges",
    copyable: true,
    width: 20,
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    width: 20,
    valueType: "dateTime",
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    width: 20,
    valueType: "dateTime",
  },
];

export default userColumns;
