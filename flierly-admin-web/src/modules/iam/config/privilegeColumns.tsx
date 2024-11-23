import { ProColumns } from "@ant-design/pro-components";
import { Tag } from "antd";

// Define columns
const privilegeColumns: ProColumns<Privilege>[] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    valueType: "text",
    search: false,
    width: 80,
    sorter: true,
    defaultSortOrder: "ascend",
  },
  {
    title: "Privilege Name",
    dataIndex: "name",
    key: "name",
    valueType: "text",
    sorter: true,
    formItemProps: {
      rules: [
        { required: true, message: "Privilege name is required." },
        { min: 5, max: 30, message: "Name must be 5-30 characters long." },
      ],
    },
  },
  {
    title: "Access Type",
    dataIndex: "access",
    key: "access",
    valueType: "select",
    valueEnum: {
      Create: { text: "Create", status: "Default" },
      Read: { text: "Read", status: "Processing" },
      Update: { text: "Update", status: "Success" },
      Delete: { text: "Delete", status: "Error" },
      Manage: { text: "Manage", status: "Warning" },
    },
    filters: true,
    onFilter: true,
  },
  {
    title: "Entity",
    dataIndex: "entity",
    key: "entity",
    valueType: "text",
    sorter: true,
    formItemProps: {
      rules: [
        { required: true, message: "Entity name is required." },
        { min: 3, max: 20, message: "Entity name must be 3-20 characters long." },
      ],
    },
  },
  {
    title: "Privilege Code",
    dataIndex: "code",
    key: "code",
    valueType: "text",
    formItemProps: {
      rules: [
        { required: true, message: "Privilege code is required." },
        { pattern: /^[a-z-]+\.[a-z-]+$/, message: "Invalid privilege code format." },
      ],
    },
  },
  {
    title: "Active",
    dataIndex: "isActive",
    key: "isActive",
    valueType: "switch",
    filters: true,
    onFilter: true,
    align: "center",
    width: "80px",
    render: (_text, entity) => {
      return !entity.isActive ? (
        <Tag color="red">InActive</Tag>
      ) : (
        <Tag color="green">Active</Tag>
      );
    },
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    valueType: "dateTime",
    sorter: true,
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    valueType: "dateTime",
    sorter: true,
    search: false,
  },
  {
    title: "Deleted At",
    dataIndex: "deletedAt",
    key: "deletedAt",
    valueType: "dateTime",
    search: false,
    hideInTable: true, // Optionally hide in the table but keep for filters or exports
  },
];

export default privilegeColumns;
