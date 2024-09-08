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
    width: 10,
    queryFormConfig: {
      name: "name",
      label: "name",
      rules: [{ type: "string" }],
      transformer: "textWithRegex",
      order: 1,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Code",
    dataIndex: "code",
    copyable: true,
    width: 10,
    queryFormConfig: {
      name: "code",
      label: "code",
      rules: [{ type: "string" }],
      transformer: "trimTextValue",
      order: 2,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    copyable: false,
    width: 20,
    queryFormConfig: {
      name: "description",
      label: "description",
      rules: [{ type: "string" }],
      transformer: "textWithRegex",
      order: 3,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    width: 10,
    valueType: "dateTime",
    sorter: true,
    defaultSortOrder: "descend",
    queryFormConfig: {
      name: "createdAt",
      label: "created_at",
      rules: [],
      transformer: "dateRange",
      order: 4,
      input: {
        type: "DateRange",
      },
    },
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    width: 10,
    valueType: "dateTime",
    sorter: true,
    queryFormConfig: {
      name: "updatedAt",
      label: "updated_at",
      rules: [],
      transformer: "dateRange",
      order: 5,
      input: {
        type: "DateRange",
      },
    },
  },
];

export default roleColumns;
