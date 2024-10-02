import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";

// Options for active status
const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

// Regex for phone number validation
const phoneRegex = () => ({
  validator(_, value) {
    return new Promise((resolve, reject) => {
      if (!value) resolve();
      if (/^\+\d{1,3}[\s][6-9]\d{9}$/.test(value)) {
        resolve();
      } else {
        reject("phone_number_is_not_valid");
      }
    });
  },
});

// Column configuration for "ID"
const idColumn = {
  title: "ID",
  dataIndex: "id",
  width: 50,
  sorter: true,
  align: "center",
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
};

// Column configuration for "Account Name"
const nameColumn = {
  title: "Account Name",
  dataIndex: "name",
  width: 180,
  sorter: true,
  createFormConfig: {
    name: "name",
    label: "Account Name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: "Account name is required." },
      { min: 5, max: 90, message: "Account name must be between 5 and 90 characters." },
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
    label: "Account Name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: "Account name is required." },
      { min: 5, max: 90, message: "Account name must be between 5 and 90 characters." },
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
};

// Column configuration for "Registered Phone"
const registeredPhoneColumn = {
  title: "Registered Phone",
  dataIndex: "registeredPhone",
  width: 180,
  sorter: true,
  createFormConfig: {
    name: "registeredPhone",
    label: "Registered Phone",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: "Account registered phone is required." },
      phoneRegex(),
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
    label: "Registered Phone",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: "Account registered phone is required." },
      phoneRegex(),
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
};

// Column configuration for "Alternate Phone"
const alternatePhoneColumn = {
  title: "Alternate Phone",
  dataIndex: "alternatePhone",
  width: 180,
  sorter: true,
  createFormConfig: {
    name: "alternatePhone",
    label: "Alternate Phone",
    hasFeedback: true,
    allowClear: true,
    rules: [
      phoneRegex(),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "alternatePhone",
    label: "Alternate Phone",
    hasFeedback: true,
    allowClear: true,
    rules: [
      phoneRegex(),
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Email"
const emailColumn = {
  title: "Email",
  dataIndex: "email",
  width: 180,
  sorter: true,
  createFormConfig: {
    name: "email",
    label: "Email",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { type: "email", message: "Invalid email format." },
      { required: true, message: "Account email is required." },
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
    label: "Email",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { type: "email", message: "Invalid email format." },
      { required: true, message: "Account email is required." },
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
    label: "Email",
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
  title: "Active",
  dataIndex: "isActive",
  width: 80,
  align: "center",
  render: (text) => {
    return text === false ? (
      <Tag color="red">Inactive</Tag>
    ) : (
      <Tag color="green">Active</Tag>
    );
  },
  createFormConfig: {
    name: "isActive",
    label: "Active",
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
    label: "Active",
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
};

// Column configuration for "VIP Status"
const isVipColumn = {
  title: "VIP Status",
  dataIndex: "isVip",
  width: 80,
  align: "center",
  render: (text) => {
    return text === false ? (
      <Tag color="red">No</Tag>
    ) : (
      <Tag color="green">Yes</Tag>
    );
  },
  createFormConfig: {
    name: "isVip",
    label: "VIP Status",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "isVip",
    label: "VIP Status",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
      options: statusOptions,
    },
  },
};

// Column configuration for "Key Account"
const isKeyColumn = {
  title: "Key Account",
  dataIndex: "isKey",
  width: 80,
  align: "center",
  render: (text) => {
    return text === false ? (
      <Tag color="red">No</Tag>
    ) : (
      <Tag color="green">Yes</Tag>
    );
  },
  createFormConfig: {
    name: "isKey",
    label: "Key Account",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "isKey",
    label: "Key Account",
    allowClear: false,
    rules: [],
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
