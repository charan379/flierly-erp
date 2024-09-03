const roleColumns = [
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
    title: "Name",
    dataIndex: "name",
    copyable: false,
    width: 20,
  },
  {
    title: "Code",
    dataIndex: "code",
    copyable: true,
    width: 10,
  },
  {
    title: "Description",
    dataIndex: "description",
    copyable: false,
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

export default roleColumns;
