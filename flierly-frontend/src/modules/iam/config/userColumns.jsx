import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import roleColumns from "./roleColumns";
import TableTransferShuttle from "@/features/TableTransfer/TableTransferShuttle";
import hasOwnProperty from "@/utils/hasOwnProperty";
import privilegeColumns from "./privilegeColumns";
import UserPasswordUpdate from "../forms/UserPasswordUpdate";
import translate from "@/features/Language/utility/translate";

// Options for active status
const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

const usernameRegex = /^[a-z0-9_]+$/;
const phoneRegex = /^\+\d{1,3}[\s][6-9]\d{9}$/;

// Column configuration for "ID"
const idColumn = {
  title: translate("id"),
  dataIndex: "id",
  width: 50,
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

// Column configuration for "Username"
const usernameColumn = {
  title: translate("username"),
  dataIndex: "username",
  copyable: false,
  width: 120,
  order: 2,
  sorter: true,
  createFormConfig: {
    name: "username",
    label: "Username",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: "string", min: 5, max: 20, required: true },
      { pattern: usernameRegex, message: translate("username_is_not_valid") },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("user-username-validation-c-1", {
            entity: "user",
            filters: { username: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "username",
    label: "Username",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: "string", min: 5, max: 20, required: true },
      { pattern: usernameRegex, message: translate("username_is_not_valid") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("user-username-validation-u-1", {
            entity: "user",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              username: { $ilike: value },
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
    name: "username",
    label: "Username",
    rules: [{ type: "regexp" }],
    width: "s",
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Email"
const emailColumn = {
  title: translate("email"),
  dataIndex: "email",
  width: 180,
  order: 3,
  sorter: true,
  createFormConfig: {
    name: "email",
    label: "email",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: "email", required: true },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("user-email-validation-c-1", {
            entity: "user",
            filters: { email: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "email",
    label: "email",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: "email", required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("user-email-validation-u-1", {
            entity: "user",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              email: { $ilike: value },
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
    name: "email",
    label: "email",
    width: "s",
    rules: [{ type: "email" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Mobile"
const mobileColumn = {
  title: translate("mobile"),
  dataIndex: "mobile",
  width: 120,
  order: 4,
  sorter: true,
  createFormConfig: {
    name: "mobile",
    label: "Mobile",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: "string", required: true },
      { pattern: phoneRegex, message: "mobile_is_not_valid" },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("user-mobile-validation-c-1", {
            entity: "user",
            filters: { mobile: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "mobile",
    label: "Mobile",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: "string", required: true },
      { pattern: phoneRegex, message: "mobile_is_not_valid" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("user-mobile-validation-u-1", {
            entity: "user",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              mobile: { $ilike: value },
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
    name: "mobile",
    label: "Mobile",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Is Active"
const isActiveColumn = {
  title: translate("active"),
  dataIndex: "isActive",
  width: 80,
  align: "center",
  order: 5,
  render: (text) => {
    return text === false ? (
      <Tag color="red">Inactive</Tag>
    ) : (
      <Tag color="green">Active</Tag>
    );
  },
  createFormConfig: {
    name: "isActive",
    label: "active",
    access: { permission: /^user\.manage$/, ifNoAccess: "disable" },
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
    label: "active",
    access: { permission: /^user\.manage$/, ifNoAccess: "disable" },
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
    label: "active",
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

const rolesColumns = {
  title: translate('roles'),
  dataIndex: "roles",
  copyable: true,
  width: 100, // Updated width
  align: "center",
  order: 6,
  render: (text, record, index, action) => {
    if (hasOwnProperty(record, "roles") && Array.isArray(record.roles)) {
      return (
        <TableTransferShuttle
          title="user_roles"
          triggerConfig={{ buttonType: "link", text: "roles" }}
          requestConfig={{
            recordId: record?.id,
            entityName: "user",
            fieldName: "roles",
            onSuccess: () => {
              setTimeout(() => {
                action.reload();
              }, 300);
            },
          }}
          tableConfig={{
            entityName: "role",
            columns: roleColumns,
            columnsToDisplay: ["name", "code"],
            targetKeys: record.roles,
            rowKey: "id",
            titles: ["available_roles", "assigned_roles"],
          }}
        />
      );
    } else {
      return null;
    }
  },
};

const additionalPrivilegesColumn = {
  title: translate("additional_access"),
  dataIndex: "additionalPrivileges",
  copyable: true,
  width: 180, // Updated width
  align: "center",
  render: (text, record, index, action) => {
    if (
      hasOwnProperty(record, "additionalPrivileges") &&
      Array.isArray(record.additionalPrivileges)
    ) {
      return (
        <TableTransferShuttle
          title="user_additional_privileges"
          triggerConfig={{ buttonType: "link", text: "additional_privileges" }}
          requestConfig={{
            recordId: record?.id,
            entityName: "user",
            fieldName: "additionalPrivileges",
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
            targetKeys: record.additionalPrivileges,
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

const restrictedPrivilegesColumn = {
  title: translate("restricted_access"),
  dataIndex: "restrictedPrivileges",
  copyable: true,
  width: 180, // Updated width
  align: "center",
  render: (text, record, index, action) => {
    if (
      hasOwnProperty(record, "restrictedPrivileges") &&
      Array.isArray(record.restrictedPrivileges)
    ) {
      return (
        <TableTransferShuttle
          title="user_restricted_privileges"
          triggerConfig={{ buttonType: "link", text: "restricted_privileges" }}
          requestConfig={{
            recordId: record?.id,
            entityName: "user",
            fieldName: "restrictedPrivileges",
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
            targetKeys: record.restrictedPrivileges,
            rowKey: "id",
            titles: ["available_privileges", "restricted_privileges"],
          }}
        />
      );
    } else {
      return null;
    }
  },
};

const passwordColumn = {
  title: translate("password"),
  key: "password",
  width: 180, // Updated width
  align: "center",
  order: 8,
  permission: /^user\.manage-password$/,
  render: (text, record, index, action) => {
    return <UserPasswordUpdate userId={record.id} />;
  },
};

const timeStamps = generateTimeStampColumns().map((timeStamp) => {
  return {
    ...timeStamp,
    width: 180,
  };
});

// Combine columns
const userColumns = [
  idColumn,
  usernameColumn,
  isActiveColumn,
  emailColumn,
  mobileColumn,
  passwordColumn,
  rolesColumns,
  additionalPrivilegesColumn,
  restrictedPrivilegesColumn,
  ...timeStamps,
];

export default userColumns;
