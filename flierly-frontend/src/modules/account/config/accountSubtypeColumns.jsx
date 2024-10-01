import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions";

// code regex pattern validator
const codeRegex = ({ }) => ({
  validator(_, value) {
    return new Promise((resolve, reject) => {
      if (!value) resolve();
      if (/^[a-z-]+\.[a-z-]+$/.test(value)) {
        resolve();
      } else {
        reject("code_is_not_valid");
      }
    });
  },
});

const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

const fetchAccountTypesAsOptions = (value) => {
  let filters = {};
  if (value) {
    filters = { name: { $ilike: `%${value}%` } };
  }
  return fetchEntityRowsAsOptions("account-type", filters, 10, (accountTypes) => {
    return accountTypes.map((acType) => {
      return { label: acType.name, value: acType.id }
    })
  })
};

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

// Column configuration for "Is Active"
const isActiveColumn = {
  title: "Active",
  dataIndex: "isActive",
  width: 5,
  align: "center",
  order: 3,
  render: (text) => {
    return text === false ? (
      <Tag color="red">Inactive</Tag>
    ) : (
      <Tag color="green">Active</Tag>
    );
  },
  createFormConfig: {
    name: "isActive",
    label: "status",
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
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator(
            "account-subtype-code-validation-c-1",
            {
              entity: "account-subtype",
              filters: { code: value },
              rejectionMessage: "account_subtype_with_same_code_already_exists",
            }
          );
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
    rules: [
      { type: "string", min: 5, max: 25, required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator(
            "account-subtype-code-validation-u-1",
            {
              entity: "account-subtype",
              filters: {
                id: { $notEqualTo: getFieldValue("id") },
                code: value,
              },
              rejectionMessage: "account_subtype_with_same_code_already_exists",
            }
          );
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
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator(
            "account-subtype-name-validation-c-1",
            {
              entity: "account-subtype",
              filters: { name: { $ilike: value } },
              rejectionMessage: "account_subtype_with_same_name_already_exists",
            }
          );
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
          return entityExistenceValidator(
            "account-subtype-name-validation-u-1",
            {
              entity: "account-subtype",
              filters: {
                id: { $notEqualTo: getFieldValue("id") },
                name: { $ilike: value },
              },
            }
          );
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

// Column configuration for "Account Type"
const accountType = {
  title: "Account Type",
  dataIndex: "accountType",
  copyable: false,
  width: 7,
  sorter: true,
  order: 5,
  createFormConfig: {
    name: "accountType",
    label: "accountType",
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^account\-subtype\.update$/, ifNoAccess: "disable" },
    rules: [{ required: true }],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: fetchAccountTypesAsOptions,
        debounceTimeout: 500,
      },
    },
  },
  updateFormConfig: {
    name: "accountType",
    label: "accountType",
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^account\-subtype\.update$/, ifNoAccess: "disable" },
    rules: [{ required: true }],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: fetchAccountTypesAsOptions,
        debounceTimeout: 500,
      },
    },
  },
  queryFormConfig: {
    name: "accountType",
    label: "accountType",
    rules: [{ type: "array" }],
    transformer: "inArray",
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "multiple",
        asyncOptionsFetcher: fetchAccountTypesAsOptions,
        debounceTimeout: 500,
      },
    },
  },
};

// Column configuration for timestamp fields
const timestampColumns = generateTimeStampColumns();

// Final columns list
const accountSubtypeColumns = [
  idColumn,
  nameColumn,
  accountType,
  isActiveColumn,
  codeColumn,
  ...timestampColumns,
];

export default accountSubtypeColumns;
