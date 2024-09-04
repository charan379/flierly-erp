const privilegeColumns = [
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
    width: 10,
  },
  {
    title: "Access",
    dataIndex: "access",
    copyable: false,
    width: 5,
    filters: true,
    filterSearch: true,
    filterMode: "menu",
    onFilter: false,
    valueType: "select",
    valueEnum: {
      Create: {
        text: "Create",
        status: "Success",
      },
      Read: {
        text: "Read",
        status: "Default",
      },
      Manage: {
        text: "Manage",
        status: "Warning",
      },
      Delete: {
        text: "Delete",
        status: "Error",
      },
      Update: {
        text: "Update",
        status: "Processing",
      },
    },
  },
  {
    title: "Model",
    dataIndex: "model",
    copyable: false,
    width: 7,
  },
  {
    title: "Code",
    dataIndex: "code",
    copyable: true,
    width: 10,
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    width: 10,
    valueType: "dateTime",
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    width: 10,
    valueType: "dateTime",
  },
];

export default privilegeColumns;
