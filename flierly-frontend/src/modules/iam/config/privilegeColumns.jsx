import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";
import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import translate from "@/features/Language/utility/translate";

const privilegeColumns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 2,
    sorter: true,
    align: "center",
    order: 1,
    createFormConfig: {
      name: "id",
      label: "id",
      hidden: true,
      disabled: true,
      tooltip: translate("this_is_a_hidden_field"),
      width: "xs",
      hasFeedback: false,
      allowClear: false,
      input: {
        type: "Text",
      },
      rules: [
        { type: "string", max: 10, required: false },
        // number regex validator
        ({ }) => ({
          validator(_, value) {
            return new Promise((resolve, reject) => {
              if (!value) resolve();
              if (/^-?\d*(\.\d*)?$/.test(value)) {
                resolve();
              } else {
                reject("id_is_not_a_valid_number")
              }
            })
          }
        }),
        // ID already exists validator
        ({ }) => ({
          validator(_, value) {
            if (value === undefined || value === "" || !/^-?\d*(\.\d*)?$/.test(value)) return Promise.resolve();
            return entityExistenceValidator({
              entity: "privilege",
              filters: { id: value },
              rejectionMessage: "id_already_exisits"
            });
          },
        }),
      ],
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    copyable: false,
    width: 10,
    order: 2,
    sorter: true,
    queryFormConfig: {
      name: "name",
      label: "name",
      rules: [{ type: "regexp" }],
      transformer: "ilike",
      input: {
        type: "Text",
      },
    },
    createFormConfig: {
      name: "name",
      label: "name",
      hasFeedback: true,
      width: "s",
      allowClear: true,
      rules: [
        { type: "string", required: true },
        ({ }) => ({
          validator(_, value) {
            if (value === undefined) return Promise.resolve();
            return entityExistenceValidator({
              entity: "privilege",
              filters: { name: { $ilike: value } },
            });
          },
        }),
      ],
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
    order: 3,
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
    createFormConfig: {
      name: "isActive",
      label: "status",
      width: 120,
      allowClear: false,
      rules: [],
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
    }
  },
  {
    title: "Access",
    dataIndex: "access",
    copyable: false,
    width: 5,
    order: 4,
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
      input: {
        type: "Select",
        select: {
          mode: "multiple",
          options: [
            { label: "Create", value: "Create", },
            { label: "Read", value: "Read", },
            { label: "Update", value: "Update", },
            { label: "Delete", value: "Delete", },
            { label: "Manage", value: "Manage", },
          ],
        },
      },
    },
    createFormConfig: {
      name: "access",
      label: "access",
      width: 120,
      allowClear: false,
      dependencies: ["entity"],
      rules: [{ type: "enum", required: true, enum: ['Create', 'Read', "Update", "Delete", "Manage"] }],
      input: {
        type: "Select",
        select: {
          mode: "single",
          options: [
            { label: "Create", value: "Create", },
            { label: "Read", value: "Read", },
            { label: "Update", value: "Update", },
            { label: "Delete", value: "Delete", },
            { label: "Manage", value: "Manage", },
          ],
        },
      },
    }
  },
  {
    title: "Entity",
    dataIndex: "entity",
    copyable: false,
    width: 7,
    sorter: true,
    order: 5,
    queryFormConfig: {
      name: "entity",
      label: "entity",
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
    createFormConfig: {
      name: "entity",
      label: "entity",
      width: 280,
      allowClear: true,
      hasFeedback: true,
      dependencies: ["access"],
      rules: [{ required: true },
      // Entity Access Validator
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined || !getFieldValue("access")) return Promise.resolve();
          return entityExistenceValidator({
            entity: "privilege",
            filters: { entity: value, access: getFieldValue("access") },
            rejectionMessage: "privilege_with_enity_access_already_exisits"
          });
        },
      }),
      ],
      input: {
        type: "SelectRemoteOptions",
        select: {
          mode: "single",
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
    }
  },
  {
    title: "Code",
    dataIndex: "code",
    copyable: true,
    width: 10,
    order: 6,
    // Query Config
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
    createFormConfig: {
      name: "code",
      label: "code",
      hasFeedback: true,
      width: "s",
      allowClear: true,
      rules: [
        { type: "string", required: true },
        ({ }) => ({
          validator(_, value) {
            if (value === undefined) return Promise.resolve();
            return entityExistenceValidator({
              entity: "privilege",
              filters: { code: value },
              rejectionMessage: "privilege_with_same_code_already_exists"
            });
          },
        }),
        ({ }) => ({
          validator(_, value) {
            return new Promise((resolve, reject) => {
              if (!value) resolve();
              if (/^[a-z]+\.[a-z]+$/.test(value)) {
                resolve();
              } else {
                reject("code_is_not_valid")
              }
            })
          }
        }),
      ],
      input: {
        type: "Text",
      },
    },
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    width: 10,
    order: 7,
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
    order: 8,
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
    order: 9,
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
