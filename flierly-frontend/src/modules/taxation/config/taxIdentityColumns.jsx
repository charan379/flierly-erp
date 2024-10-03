import { Tag } from "antd";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import translate from "@/features/Language/utility/translate";

// Regex patterns for validation
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const vatRegex = /^(ATU[0-9]{8}|BE0[0-9]{9}|BG[0-9]{9,10}|...)$/; // Complete the pattern as needed
const tinRegex = /^[A-Z0-9]{1,10}$/; // Customize this regex as needed

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
    width: "xs",
    input: {
      type: "Number",
    },
    rules: [{ type: "integer", required: false }],
  },
};

// Column configuration for "GST Number"
const gstColumn = {
  title: translate("gst_number"),
  dataIndex: "gst",
  width: 150,
  sorter: true,
  order: 2,
  createFormConfig: {
    name: "gst",
    label: "gst_number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { pattern: gstRegex, message: translate("gst_number_is_invalid") },
      ({ }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-gst-validation-c", {
            entity: "tax-identity",
            filters: { gst: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "gst",
    label: "gst_number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { pattern: gstRegex, message: translate("gst_number_is_invalid") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-gst-validation-u", {
            entity: "tax-identity",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              gst: { $ilike: value },
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
    name: "gst",
    label: "gst_number",
    hasFeedback: true,
    allowClear: true,
    width: "s",
    rules: [
      { pattern: gstRegex, message: translate("gst_number_is_invalid") },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "GST Registration Date"
const gstRegistrationDateColumn = {
  title: "GST Registration Date",
  dataIndex: "gstRegistrationDate",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "gstRegistrationDate",
    label: "GST Registration Date",
    hasFeedback: true,
    allowClear: true,
    width: "100%",
    input: {
      type: "DatePicker",
    },
  },
  updateFormConfig: {
    name: "gstRegistrationDate",
    label: "GST Registration Date",
    hasFeedback: true,
    allowClear: true,
    input: {
      type: "DatePicker",
    },
  },
};

// Column configuration for "PAN Number"
const panColumn = {
  title: "PAN Number",
  dataIndex: "pan",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "pan",
    label: "PAN Number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: "PAN number is not allowed to be empty." },
      { pattern: panRegex, message: "PAN number is not valid." },
      ({ }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-pan-validation-c", {
            entity: "tax_identity",
            filters: { pan: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "pan",
    label: "PAN Number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: "PAN number is not allowed to be empty." },
      { pattern: panRegex, message: "PAN number is not valid." },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-pan-validation-u", {
            entity: "tax_identity",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              pan: { $ilike: value },
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

// Column configuration for "GST Verified"
const gstVerifiedColumn = {
  title: "GST Verified",
  dataIndex: "gstVerified",
  width: 100,
  sorter: true,
  render: (text) => {
    return text ? <Tag color="green">Verified</Tag> : <Tag color="red">Not Verified</Tag>;
  },
  createFormConfig: {
    name: "gstVerified",
    label: "GST Verified",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "gstVerified",
    label: "GST Verified",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
};

// Column configuration for "PAN Verified"
const panVerifiedColumn = {
  title: "PAN Verified",
  dataIndex: "panVerified",
  width: 100,
  sorter: true,
  render: (text) => {
    return text ? <Tag color="green">Verified</Tag> : <Tag color="red">Not Verified</Tag>;
  },
  createFormConfig: {
    name: "panVerified",
    label: "PAN Verified",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "panVerified",
    label: "PAN Verified",
    allowClear: false,
    rules: [],
    input: {
      type: "Switch",
    },
  },
};

// Column configuration for "VAT Number"
const vatColumn = {
  title: "VAT Number",
  dataIndex: "vat",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "vat",
    label: "VAT Number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: "VAT number is not allowed to be empty." },
      { pattern: vatRegex, message: "VAT number is not valid." },
      ({ }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-vat-validation-c", {
            entity: "tax_identity",
            filters: { vat: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "vat",
    label: "VAT Number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: "VAT number is not allowed to be empty." },
      { pattern: vatRegex, message: "VAT number is not valid." },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-vat-validation-u", {
            entity: "tax_identity",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              vat: { $ilike: value },
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

// Column configuration for "TIN Number"
const tinColumn = {
  title: "TIN Number",
  dataIndex: "tin",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "tin",
    label: "TIN Number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: "TIN number is not allowed to be empty." },
      { pattern: tinRegex, message: "TIN number is not valid." },
      ({ }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-tin-validation-c", {
            entity: "tax_identity",
            filters: { tin: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "tin",
    label: "TIN Number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: "TIN number is not allowed to be empty." },
      { pattern: tinRegex, message: "TIN number is not valid." },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-tin-validation-u", {
            entity: "tax_identity",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              tin: { $ilike: value },
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

// Active Status
const isActiveColumn = {
  title: "Active Status",
  dataIndex: "isActive",
  width: 100,
  sorter: true,
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

// Timestamps
const timestampColumns = generateTimeStampColumns().map((timeStamp) => {
  return {
    ...timeStamp,
    width: 180,
  };
});

// Column configuration array
const taxIdentityColumns = [
  idColumn,
  gstColumn,
  gstRegistrationDateColumn,
  panColumn,
  panVerifiedColumn,
  gstVerifiedColumn,
  vatColumn,
  tinColumn,
  isActiveColumn,
  ...timestampColumns,
];

export default taxIdentityColumns;