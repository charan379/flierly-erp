import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";
import { Tag } from "antd";

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
    sorter: true,
    queryFormConfig: {
      name: "name",
      label: "name",
      rules: [{ type: "regexp" }],
      transformer: "textWithRegex",
      order: 1,
      input: {
        type: "Text",
      },
    },
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
    queryFormConfig: {
      name: "access",
      label: "access",
      rules: [{ type: "array" }],
      transformer: "inArray",
      order: 2,
      input: {
        type: "Select",
        select: {
          mode: "multiple",
          options: [
            {
              label: "Create",
              value: "Create",
            },
            {
              label: "Read",
              value: "Read",
            },
            {
              label: "Update",
              value: "Update",
            },
            {
              label: "Delete",
              value: "Delete",
            },
            {
              label: "Manage",
              value: "Manage",
            },
          ],
        },
      },
    },
  },
  {
    title: "Model",
    dataIndex: "model",
    copyable: false,
    width: 7,
    sorter: true,
    queryFormConfig: {
      name: "model",
      label: "model",
      order: 3,
      rules: [{ type: "array" }],
      transformer: "inArray",
      input: {
        type: "SelectRemoteOptions",
        select: {
          mode: "multiple",
          asyncOptionsFetcher: async (value) => {
            const response = await selectRemoteOptionsService.models({
              keyword: value,
            });
            if (
              response?.success &&
              response?.result &&
              Array.isArray(response.result)
            ) {
              return response.result.map((model) => {
                return { label: model.entity, value: model.entity };
              });
            }
          },
          debounceTimeout: 300,
          // labelRender: (props) => {
          //   console.log(props);
          //   return <Tag>sdfsdf</Tag>;
          // },
          // optionRender: (option, info) => {
          //   console.log(JSON.stringify(option), info);
          //   return <Tag>sdfsdf</Tag>;
          // },
        },
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
      order: 4,
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
      order: 5,
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
      order: 6,
      input: {
        type: "DateRange",
      },
    },
  },
];

export default privilegeColumns;
