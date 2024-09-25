import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";
import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";

const privilegeColumns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 2,
    sorter: true,
    align: "center",
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
      hasFeedback: true,
      rules: [{ type: "regexp" }],
      transformer: "ilike",
      order: 1,
      input: {
        type: "Text",
      },
    },
    createFormConfig: {
      name: "name",
      label: "name",
      hasFeedback: true,
      rules: [
        { type: "string", required: true },
        ({}) => ({
          validator(_, value) {
            if(value === undefined) return Promise.resolve();
            return entityExistenceValidator({
              entity: "privilege",
              filters: { name: { $ilike: value } },
            });
          },
        }),
        ({}) => ({
          validator(_, value) {
            return new Promise((resolve, reject) => {
              if (/[^a-zA-Z0-9]/.test(value)) {
                reject("Username cannot contain special characters.");
              } else {
                resolve();
              }
            });
          },
        }),
      ],
      transformer: "ilike",
      order: 1,
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Active",
    dataIndex: "isActive",
    width: 5,
    align: "center",
    render: (text, record, index, action) => {
      return text === false ? (
        <Tag color="red">InActive</Tag>
      ) : (
        <Tag color="green">Active</Tag>
      );
    },
    queryFormConfig: {
      name: "isActive",
      label: "status",
      rules: [{ type: "boolean" }],
      order: 2,
      input: {
        type: "Select",
        select: {
          mode: "single",
          options: [
            { label: "Active", value: true },
            { label: "In Active", value: false },
          ],
        },
      },
    },
  },
  {
    title: "Access",
    dataIndex: "access",
    copyable: false,
    width: 5,
    render: (text, record, index, action) => {
      switch (text) {
        case "Create":
          return <Tag color="#50C878">{text}</Tag>;
        case "Read":
          return <Tag color="#008080">{text}</Tag>;
        case "Update":
          return <Tag color="#FF7F50">{text}</Tag>;
        case "Manage":
          return <Tag color="#191970">{text}</Tag>;
        case "Delete":
          return <Tag color="#DC143C">{text}</Tag>;
        default:
          return <Tag>{text}</Tag>;
      }
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
    title: "Entity",
    dataIndex: "entity",
    copyable: false,
    width: 7,
    sorter: true,
    queryFormConfig: {
      name: "entity",
      label: "entity",
      order: 3,
      rules: [{ type: "array" }],
      transformer: "inArray",
      input: {
        type: "SelectRemoteOptions",
        select: {
          mode: "multiple",
          asyncOptionsFetcher: async (value) => {
            const response = await selectRemoteOptionsService.entities({
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
    queryFormConfig: {
      name: "createdAt",
      label: "created_at",
      rules: [],
      transformer: "between",
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
      transformer: "between",
      order: 6,
      input: {
        type: "DateRange",
      },
    },
  },
  {
    title: "Deleted",
    dataIndex: "deletedAt",
    width: 10,
    valueType: "dateTime",
    sorter: true,
    queryFormConfig: {
      name: "deletedAt",
      label: "deleted_at",
      rules: [],
      transformer: "between",
      order: 7,
      input: {
        type: "DateRange",
      },
    },
  },
];

export default privilegeColumns;
