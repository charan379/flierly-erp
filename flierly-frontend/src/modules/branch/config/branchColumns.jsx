const columns = [
  {
    title: "index",
    dataIndex: "index",
    valueType: "indexBorder",
    width: 15,
  },
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
    title: "Name",
    dataIndex: "name",
    copyable: true,
    width: 20,
  },
  {
    title: "Active",
    dataIndex: "isActive",
    width: 15,
  },
  {
    title: "Email",
    dataIndex: "email",
    copyable: true,
    width: 20,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    copyable: true,
    width: 20,
  },
  {
    title: "Alt Phone",
    dataIndex: "alternatePhone",
    copyable: true,
    width: 20,
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 20,
  },
  {
    title: "Tax Identity",
    dataIndex: "taxIdentity",
    width: 20,
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    width: 20,
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    width: 20,
  },
];

export default columns;