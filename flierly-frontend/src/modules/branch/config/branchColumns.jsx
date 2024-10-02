import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";

// Regex patterns for validation
const phoneRegex = /^\+\d{1,3}[\s][6-9]\d{9}$/;

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

// Column configuration for "Is Active"
const isActiveColumn = {
  title: "Active Status",
  dataIndex: "isActive",
  width: 120,
  sorter: true,
  align: "center",
  render: (text) => {
    return text ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>;
  },
  createFormConfig: {
    name: "isActive",
    label: "Active Status",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "isActive",
    label: "Active Status",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
};

// Column configuration for "Branch Name"
const nameColumn = {
  title: "Branch Name",
  dataIndex: "name",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "name",
    label: "Branch Name",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Branch name is required." }, { min: 5, max: 90, message: 'Branch name must be between 5 and 90 characters.' }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "name",
    label: "Branch Name",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Branch name is required." }, { min: 5, max: 90, message: 'Branch name must be between 5 and 90 characters.' }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Email"
const emailColumn = {
  title: "Branch Email",
  dataIndex: "email",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "email",
    label: "Branch Email",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Branch email is required." }, { type: "email", message: "Invalid email format." }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "email",
    label: "Branch Email",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Branch email is required." }, { type: "email", message: "Invalid email format." }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Phone"
const phoneColumn = {
  title: "Branch Phone Number",
  dataIndex: "phone",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "phone",
    label: "Branch Phone Number",
    allowClear: true,
    rules: [
      { required: true, message: "Branch phone number is required." },
      { pattern: phoneRegex, message: 'Branch phone number must be in the format: +<country_code> <10-digit_number>' },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "phone",
    label: "Branch Phone Number",
    allowClear: true,
    rules: [
      { required: true, message: "Branch phone number is required." },
      { pattern: phoneRegex, message: 'Branch phone number must be in the format: +<country_code> <10-digit_number>' },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Alternate Phone"
const alternatePhoneColumn = {
  title: "Alternate Phone Number",
  dataIndex: "alternatePhone",
  width: 180,
  sorter: true,
  createFormConfig: {
    name: "alternatePhone",
    label: "Alternate Phone Number",
    allowClear: true,
    rules: [
      { required: false },
      { pattern: phoneRegex, message: 'Alternate phone number must be in the format: +<country_code> <10-digit_number>' },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "alternatePhone",
    label: "Alternate Phone Number",
    allowClear: true,
    rules: [
      { required: false },
      { pattern: phoneRegex, message: 'Alternate phone number must be in the format: +<country_code> <10-digit_number>' },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Address"
const addressColumn = {
  title: "Address",
  dataIndex: "address",
  width: 150,
  sorter: true,
  render: (address) => (address ? address.line1 : 'No Address'),
  createFormConfig: {
    name: "address",
    label: "Address",
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
    label: "Address",
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
  title: "Tax Identity",
  dataIndex: "taxIdentity",
  width: 150,
  sorter: true,
  render: (taxIdentity) => (taxIdentity ? taxIdentity.name : 'No Tax Identity'),
  createFormConfig: {
    name: "taxIdentity",
    label: "Tax Identity",
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
    label: "Tax Identity",
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