import { Tag } from "antd";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import translate from "@/features/Language/utility/translate";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";

// Regex patterns for validation
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
    label: "ID",
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
    label: "ID",
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
    width: "xs",
    input: {
      type: "Number",
    },
    rules: [{ type: "integer", required: false }],
  },
};

// Column configuration for "Is Active"
const isActiveColumn = {
  title: translate("active"),
  dataIndex: "isActive",
  width: 100,
  sorter: true,
  order: 2,
  render: (text) => {
    return text ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>;
  },
  createFormConfig: {
    name: "isActive",
    label: "active",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "isActive",
    label: "active",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
  queryFormConfig: {
    name: "isActive",
    label: "active",
    width: 120,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
};

// Column configuration for "Branch Name"
const nameColumn = {
  title: translate("branch_name"),
  dataIndex: "name",
  width: 150,
  sorter: true,
  order: 3,
  createFormConfig: {
    name: "name",
    label: "branch_name",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("branch_name_is_required") },
      { min: 5, max: 90, message: translate("branch_name_must_be_between_5_and_90_characters") },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "name",
    label: "branch_name",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("branch_name_is_required") },
      { min: 5, max: 90, message: translate("branch_name_must_be_between_5_and_90_characters") },
    ],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "name",
    label: "branch_name",
    width: "s",
    rules: [],
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
  order: 4,
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
          return entityExistenceValidator("branch-email-validation-c-1", {
            entity: "branch",
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
          return entityExistenceValidator("branch-email-validation-u-1", {
            entity: "branch",
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

// Column configuration for "Phone"
const phoneColumn = {
  title: translate("phone_number"),
  dataIndex: "phone",
  width: 150,
  sorter: true,
  order: 5,
  createFormConfig: {
    name: "phone",
    label: "phone_number",
    allowClear: true,
    rules: [
      { required: true, message: translate("phone_is_required") },
      { pattern: phoneRegex, message: translate("phone_is_not_valid") },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("barnch-phone-validation-c-1", {
            entity: "branch",
            filters: { registeredPhone: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "phone",
    label: "phone_number",
    allowClear: true,
    rules: [
      { required: true, message: translate("phone_is_required") },
      { pattern: phoneRegex, message: translate("phone_is_not_valid") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("branch-phone-validation-u-1", {
            entity: "branch",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              registeredPhone: { $ilike: value },
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
    name: "phone",
    label: "phone_number",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Alternate Phone"
const alternatePhoneColumn = {
  title: translate("alternate_phone"),
  dataIndex: "alternatePhone",
  width: 180,
  sorter: true,
  order: 6,
  createFormConfig: {
    name: "alternatePhone",
    label: "alternate_phone",
    hasFeedback: true,
    allowClear: true,
    rules: [{ pattern: phoneRegex, message: translate("phone_is_not_valid") }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "alternatePhone",
    label: "alternate_phone",
    hasFeedback: true,
    allowClear: true,
    rules: [{ pattern: phoneRegex, message: translate("phone_is_not_valid") }],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "alternatePhone",
    label: "alternate_phone",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Address"
const addressColumn = {
  title: translate("address"),
  dataIndex: "address",
  width: 150,
  sorter: true,
  order: 7,
  createFormConfig: {
    name: "address",
    label: "address",
    hasFeedback: true,
    allowClear: true,
    rules: [],
    input: {
      type: "Select",
      options: [], // Populate with addresses
    },
  },
  updateFormConfig: {
    name: "address",
    label: "address",
    hasFeedback: true,
    allowClear: true,
    rules: [],
    input: {
      type: "Select",
      options: [], // Populate with addresses
    },
  },
};

// Column configuration for "Tax Identity"
const taxIdentityColumn = {
  title: translate("tax_identity"),
  dataIndex: "taxIdentity",
  width: 150,
  sorter: true,
  order: 8,
  createFormConfig: {
    name: "taxIdentity",
    label: "tax_identity",
    hasFeedback: true,
    allowClear: true,
    rules: [],
    input: {
      type: "Select",
      options: [], // Populate with tax identities
    },
  },
  updateFormConfig: {
    name: "taxIdentity",
    label: "tax_identity",
    hasFeedback: true,
    allowClear: true,
    rules: [],
    input: {
      type: "Select",
      options: [], // Populate with tax identities
    },
  },
};

// Timestamps
const timestampColumns = generateTimeStampColumns().map((timeStamp) => {
  return {
    ...timeStamp,
    width: 180,
  };
});

// Column configuration array
const branchColumns = [
  idColumn,
  isActiveColumn,
  nameColumn,
  emailColumn,
  phoneColumn,
  alternatePhoneColumn,
  addressColumn,
  taxIdentityColumn,
  ...timestampColumns,
];

export default branchColumns;