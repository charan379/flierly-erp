import selectRemoteOptionsService from "@/features/SelectRemoteOptions/service";
import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import timeStampColumns from "@/config/common/timeStampColumns";

// Column configuration for "ID"
const idColumn = {
  title: "ID",
  dataIndex: "id",
  width: 2,
  sorter: true,
  align: "center",
  order: 1,
  // Uncomment and configure if needed
  // createFormConfig: {
  //   name: "id",
  //   label: "id",
  //   hidden: true,
  //   disabled: true,
  //   hasFeedback: false,
  //   allowClear: false,
  //   input: {
  //     type: "Text",
  //   },
  //   rules: [
  //     { type: "string", max: 10, required: false },
  //     // Number regex validator
  //     ({ }) => ({
  //       validator(_, value) {
  //         return new Promise((resolve, reject) => {
  //           if (!value) resolve();
  //           if (/^-?\d*(\.\d*)?$/.test(value)) {
  //             resolve();
  //           } else {
  //             reject("id_is_not_a_valid_number");
  //           }
  //         });
  //       }
  //     }),
  //     // ID already exists validator
  //     ({ }) => ({
  //       validator(_, value) {
  //         if (value === undefined || value === "" || !/^-?\d*(\.\d*)?$/.test(value)) return Promise.resolve();
  //         return entityExistenceValidator({
  //           entity: "privilege",
  //           filters: { id: value },
  //           rejectionMessage: "id_already_exists"
  //         });
  //       },
  //     }),
  //   ],
  // },
  queryFormConfig: {
    name: "id",
    label: "id",
    allowClear: true,
    width: 's',
    input: {
      type: "Number",
    },
    rules: [
      { type: "integer", required: false },
    ],
  },
};

// Column configuration for "Name"
const nameColumn = {
  title: "Name",
  dataIndex: "name",
  copyable: false,
  width: 10,
  order: 2,
  sorter: true,
  createFormConfig: {
    name: "name",
    label: "name",
    hasFeedback: true,
    allowClear: true,
    access: { permission: /^privilege\.update$/, ifNoAccess: "disable" },
    rules: [
      { type: "string", required: true },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("privilege-name-validation-1", {
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
  queryFormConfig: {
    name: "name",
    label: "name",
    rules: [{ type: "regexp" }],
    width: "s",
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Active"
const activeColumn = {
  title: "Active",
  dataIndex: "isActive",
  width: 5,
  align: "center",
  order: 3,
  render: (text) => {
    return text === false ? (
      <Tag color="red">InActive</Tag>
    ) : (
      <Tag color="green">Active</Tag>
    );
  },
  createFormConfig: {
    name: "isActive",
    label: "status",
    access: { permission: /^privilege\.manage$/, ifNoAccess: "disable" },
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
  },
  queryFormConfig: {
    name: "isActive",
    label: "status",
    width: 120,
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
};

// Column configuration for "Access"
const accessColumn = {
  title: "Access",
  dataIndex: "access",
  copyable: false,
  width: 5,
  order: 4,
  render: (text) => {
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
  createFormConfig: {
    name: "access",
    label: "access",
    allowClear: false,
    access: { permission: /^privilege\.update$/, ifNoAccess: "disable" },
    dependencies: ["entity"],
    rules: [{ type: "enum", required: true, enum: ['Create', 'Read', "Update", "Delete", "Manage"] }],
    input: {
      type: "Select",
      select: {
        mode: "single",
        options: [
          { label: "Create", value: "Create" },
          { label: "Read", value: "Read" },
          { label: "Update", value: "Update" },
          { label: "Delete", value: "Delete" },
          { label: "Manage", value: "Manage" },
        ],
      },
    },
  },
  queryFormConfig: {
    name: "access",
    label: "access",
    width: 120,
    rules: [{ type: "array" }],
    transformer: "inArray",
    input: {
      type: "Select",
      select: {
        mode: "multiple",
        options: [
          { label: "Create", value: "Create" },
          { label: "Read", value: "Read" },
          { label: "Update", value: "Update" },
          { label: "Delete", value: "Delete" },
          { label: "Manage", value: "Manage" },
        ],
      },
    },
  },
};

// Column configuration for "Entity"
const entityColumn = {
  title: "Entity",
  dataIndex: "entity",
  copyable: false,
  width: 7,
  sorter: true,
  order: 5,
  createFormConfig: {
    name: "entity",
    label: "entity",
    allowClear: false,
    hasFeedback: true,
    dependencies: ["access"],
    access: { permission: /^privilege\.update$/, ifNoAccess: "disable" },
    rules: [
      { required: true },
      // Entity Access Validator
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined || !getFieldValue("access")) return Promise.resolve();
          return entityExistenceValidator("privilege-entity-access-validation-1", {
            entity: "privilege",
            filters: { entity: value, access: getFieldValue("access") },
            rejectionMessage: "privilege_with_entity_access_already_exists"
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
  },
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
};

// Column configuration for "Code"
const codeColumn = {
  title: "Code",
  dataIndex: "code",
  copyable: true,
  width: 10,
  order: 6,
  createFormConfig: {
    name: "code",
    label: "code",
    hasFeedback: true,
    allowClear: true,
    access: { permission: /^privilege\.update$/, ifNoAccess: "disable" },
    rules: [
      { type: "string", required: true },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("privilege-code-validation-1", {
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
              reject("code_is_not_valid");
            }
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "code",
    label: "code",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "trimTextValue",
    order: 4,
    input: {
      type: "Text",
    },
  },
};

const privilegeColumns = [idColumn, nameColumn, activeColumn, accessColumn, entityColumn, codeColumn, ...timeStampColumns];

export default privilegeColumns;