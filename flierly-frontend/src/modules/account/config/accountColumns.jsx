import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import translate from "@/features/Language/utility/translate";

// Options for active status
const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

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

// Column configuration for "Account Name"
const nameColumn = {
  title: translate("account_name"),
  dataIndex: "name",
  width: 180,
  sorter: true,
  order: 2,
  createFormConfig: {
    name: "name",
    label: "account_name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("account_name_is_required") },
      { min: 5, max: 90, message: translate("account_name_must_be_between_5_and_90_characters") },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("account-name-validation-c-1", {
            entity: "account",
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
    label: "account_name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("account_name_is_required") },
      { min: 5, max: 90, message: translate("account_name_must_be_between_5_and_90_characters") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("account-name-validation-u-1", {
            entity: "account",
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
    label: "account_name",
    rules: [{ type: "regexp" }],
    width: "s",
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Registered Phone"
const registeredPhoneColumn = {
  title: translate("registered_phone"),
  dataIndex: "registeredPhone",
  width: 180,
  sorter: true,
  order: 3,
  createFormConfig: {
    name: "registeredPhone",
    label: "registered_phone",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("phone_is_required") },
      { pattern: phoneRegex, message: translate("phone_is_not_valid") },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("account-registered-phone-validation-c-1", {
            entity: "account",
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
    name: "registeredPhone",
    label: "registered_phone",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("phone_is_required") },
      { pattern: phoneRegex, message: translate("phone_is_not_valid") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("account-registered-phone-validation-u-1", {
            entity: "account",
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
    name: "registeredPhone",
    label: "registered_phone",
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
  order: 4,
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

// Column configuration for "Email"
const emailColumn = {
  title: translate("email"),
  dataIndex: "email",
  width: 180,
  sorter: true,
  order: 5,
  createFormConfig: {
    name: "email",
    label: "email",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { type: "email", message: translate("invalid_email_format") },
      { required: true, message: translate("email_is_required") },
      ({ }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("account-email-validation-c-1", {
            entity: "account",
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
    allowClear: false,
    rules: [
      { type: "email", message: translate("invalid_email_format") },
      { required: true, message: translate("email_is_required") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("account-email-validation-u-1", {
            entity: "account",
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

// Column configuration for "Is Active"
const isActiveColumn = {
  title: translate("active"),
  dataIndex: "isActive",
  width: 80,
  align: "center",
  order: 6,
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

// Column configuration for "VIP Status"
const isVipColumn = {
  title: translate("vip"),
  dataIndex: "isVip",
  width: 80,
  align: "center",
  order: 7,
  render: (text) => {
    return text === false ? (
      <Tag color="red">No</Tag>
    ) : (
      <Tag color="green">Yes</Tag>
    );
  },
  createFormConfig: {
    name: "isVip",
    label: "vip",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "isVip",
    label: "vip",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  queryFormConfig: {
    name: "isVip",
    label: "vip",
    width: 120,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
};

// Column configuration for "Key Account"
const isKeyColumn = {
  title: translate("key_account"),
  dataIndex: "isKey",
  width: 90,
  align: "center",
  order: 8,
  render: (text) => {
    return text === false ? (
      <Tag color="red">No</Tag>
    ) : (
      <Tag color="green">Yes</Tag>
    );
  },
  createFormConfig: {
    name: "isKey",
    label: "key_account",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "isKey",
    label: "key_account",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  queryFormConfig: {
    name: "isKey",
    label: "key_account",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
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
const accountColumns = [
  idColumn,
  nameColumn,
  isActiveColumn,
  registeredPhoneColumn,
  alternatePhoneColumn,
  emailColumn,
  isVipColumn,
  isKeyColumn,
  ...timestampColumns,
];

export default accountColumns;
