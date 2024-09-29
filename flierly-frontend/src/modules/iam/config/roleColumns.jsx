import TableTransferShuttle from "@/features/TableTransfer/TableTransferShuttle";
import hasOwnProperty from "@/utils/hasOwnProperty";
import { Tag } from "antd";
import privilegeColumns from "./privilegeColumns";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";

const statusOptions = [
  { label: "Active", value: true },
  { label: "In Active", value: false },
];

// code regex pattern validator
const codeRegex = ({}) => ({
  validator(_, value) {
    return new Promise((resolve, reject) => {
      if (!value) resolve();
      if (/^[a-z]+\-[a-z0-9]+$/.test(value)) {
        resolve();
      } else {
        reject("code_is_not_valid");
      }
    });
  },
});

// Column configuration for "ID"
const idColumn = {
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
    hasFeedback: false,
    allowClear: false,
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "id",
    label: "id",
    hidden: true,
    disabled: true,
    hasFeedback: false,
    allowClear: false,
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "id",
    label: "id",
    allowClear: true,
    width: "s",
    input: {
      type: "Number",
    },
    rules: [{ type: "integer", required: false }],
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
    rules: [
      { type: "string", min: 5, max: 30, required: true },
      ({}) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("role-name-validation-c-1", {
            entity: "role",
            filters: { name: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "name",
    label: "name",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: "string", min: 5, max: 30, required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("role-name-validation-u-1", {
            entity: "role",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              name: { $ilike: value },
            },
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
    access: { permission: /^role\.manage$/, ifNoAccess: "disable" },
    allowClear: false,
    rules: [],
    input: {
      type: "Select",
      select: {
        mode: "single",
        options: statusOptions,
      },
    },
  },
  updateFormConfig: {
    name: "isActive",
    label: "status",
    access: { permission: /^role\.manage$/, ifNoAccess: "disable" },
    allowClear: false,
    rules: [],
    input: {
      type: "Select",
      select: {
        mode: "single",
        options: statusOptions,
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
        options: statusOptions,
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
  order: 4,
  createFormConfig: {
    name: "code",
    label: "code",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: "string", min: 5, max: 25, required: true },
      ({}) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("role-code-validation-1", {
            entity: "role",
            filters: { code: value },
            rejectionMessage: "role_with_same_code_already_exists",
          });
        },
      }),
      codeRegex,
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "code",
    label: "code",
    hasFeedback: true,
    allowClear: true,
    access: { permission: /^role\.manage$/, ifNoAccess: "disable" },
    rules: [
      { type: "string", min: 5, max: 25, required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("role-code-validation-1", {
            entity: "role",
            filters: { id: { $notEqualTo: getFieldValue("id") }, code: value },
            rejectionMessage: "role_with_same_code_already_exists",
          });
        },
      }),
      codeRegex,
    ],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "code",
    label: "code",
    width: "s",
    rules: [{ type: "string", min: 5, max: 25 }, codeRegex],
    transformer: "trimTextValue",
    input: {
      type: "Text",
    },
  },
};

const privilegeColumn = {
  title: "Privileges",
  dataIndex: "privileges",
  width: 10,
  order: 6,
  align: "center",
  hideInTable: false,
  render: (text, record, index, action) => {
    if (
      hasOwnProperty(record, "privileges") &&
      Array.isArray(record.privileges)
    ) {
      return (
        <TableTransferShuttle
          title="role_privileges"
          triggerConfig={{ buttonType: "link", text: "privileges" }}
          requestConfig={{
            recordId: record?.id,
            entityName: "role",
            fieldName: "privileges",
            onSuccess: () => {
              setTimeout(() => {
                action.reload();
              }, 300);
            },
          }}
          tableConfig={{
            entityName: "privilege",
            columns: privilegeColumns,
            columnsToDisplay: ["name", "access", "entity"],
            targetKeys: record.privileges,
            rowKey: "id",
            titles: ["available_privileges", "assigned_privileges"],
          }}
        />
      );
    } else {
      return null;
    }
  },
};

const descriptionColumn = {
  title: "Description",
  dataIndex: "description",
  copyable: false,
  width: 15,
  order: 5,
  createFormConfig: {
    name: "description",
    label: "description",
    rules: [{ type: "string", min: 10, max: 350, required: true }],
    fieldProps: { rows: 5 },
    input: {
      type: "TextArea",
    },
  },
  updateFormConfig: {
    name: "description",
    label: "description",
    rules: [{ type: "string", min: 10, max: 350, required: true }],
    fieldProps: { rows: 5 },
    input: {
      type: "TextArea",
    },
  },
  queryFormConfig: {
    name: "description",
    label: "description",
    rules: [{ type: "string", max: 350 }],
    fieldProps: { rows: 1 },
    transformer: "ilike",
    input: {
      type: "TextArea",
    },
  },
};

const timeStamps = generateTimeStampColumns();

const roleColumns = [
  idColumn,
  nameColumn,
  activeColumn,
  codeColumn,
  descriptionColumn,
  privilegeColumn,
  ...timeStamps,
];

export default roleColumns;
