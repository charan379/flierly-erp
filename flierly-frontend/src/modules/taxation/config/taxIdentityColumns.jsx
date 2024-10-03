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
  title: translate("gst_registration_date"),
  dataIndex: "gstRegistrationDate",
  width: 150,
  sorter: true,
  order: 3,
  createFormConfig: {
    name: "gstRegistrationDate",
    label: "gst_registration_date",
    hasFeedback: true,
    allowClear: true,
    width: "100%",
    input: {
      type: "DatePicker",
    },
  },
  updateFormConfig: {
    name: "gstRegistrationDate",
    label: "gst_registration_date",
    hasFeedback: true,
    allowClear: true,
    width: "100%",
    input: {
      type: "DatePicker",
    },
  },
  queryFormConfig: {
    name: "gstRegistrationDate",
    label: "gst_registration_date",
    rules: [],
    transformer: "between",
    input: {
      type: "DateRange",
    },
  },
};

// Column configuration for "PAN Number"
const panColumn = {
  title: translate("pan_number"),
  dataIndex: "pan",
  width: 150,
  sorter: true,
  order: 4,
  createFormConfig: {
    name: "pan",
    label: "pan_number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { pattern: panRegex, message: translate("invalid_pan_number") },
      ({ }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-pan-validation-c", {
            entity: "tax-identity",
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
    label: "pan_number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { pattern: panRegex, message: translate("invalid_pan_number") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-pan-validation-u", {
            entity: "tax-identity",
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
  queryFormConfig: {
    name: "pan",
    label: "pan_number",
    allowClear: true,
    width: "s",
    rules: [
      { pattern: panRegex, message: translate("invalid_pan_number") },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "GST Verified"
const gstVerifiedColumn = {
  title: translate("gst_verified"),
  dataIndex: "gstVerified",
  width: 100,
  sorter: true,
  order: 5,
  render: (text) => {
    return text ? <Tag color="green">Verified</Tag> : <Tag color="red">Not Verified</Tag>;
  },
  createFormConfig: {
    name: "gstVerified",
    label: "gst_verified",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "gstVerified",
    label: "gst_verified",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  queryFormConfig: {
    name: "gstVerified",
    label: "gst_verified",
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
};

// Column configuration for "PAN Verified"
const panVerifiedColumn = {
  title: translate("pan_verified"),
  dataIndex: "panVerified",
  width: 100,
  sorter: true,
  order: 6,
  render: (text) => {
    return text ? <Tag color="green">Verified</Tag> : <Tag color="red">Not Verified</Tag>;
  },
  createFormConfig: {
    name: "panVerified",
    label: "pan_verified",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "panVerified",
    label: "pan_verified",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  queryFormConfig: {
    name: "panVerified",
    label: "pan_verified",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
};

// Column configuration for "VAT Number"
const vatColumn = {
  title: translate("vat_number"),
  dataIndex: "vat",
  width: 150,
  sorter: true,
  order: 7,
  createFormConfig: {
    name: "vat",
    label: "vat_number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { pattern: vatRegex, message: translate("vat_number_is_invalid") },
      ({ }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-vat-validation-c", {
            entity: "tax-identity",
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
    label: "vat_number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { pattern: vatRegex, message: translate("vat_number_is_invalid") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-vat-validation-u", {
            entity: "tax-identity",
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
  queryFormConfig: {
    name: "vat",
    label: "vat_number",
    allowClear: true,
    width: "s",
    rules: [
      { pattern: vatRegex, message: translate("vat_number_is_invalid") },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "TIN Number"
const tinColumn = {
  title: translate("tin_number"),
  dataIndex: "tin",
  width: 150,
  sorter: true,
  order: 8,
  createFormConfig: {
    name: "tin",
    label: "tin_number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { pattern: tinRegex, message: translate("tin_number_is_not_valid") },
      ({ }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-tin-validation-c", {
            entity: "tax-identity",
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
    label: "tin_number",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { pattern: tinRegex, message: translate("tin_number_is_not_valid") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("tax-identity-tin-validation-u", {
            entity: "tax-identity",
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
  queryFormConfig: {
    name: "tin",
    label: "tin_number",
    allowClear: true,
    width: "s",
    rules: [
      { pattern: tinRegex, message: translate("tin_number_is_not_valid") },
    ],
    input: {
      type: "Text",
    },
  },
};

// Active Status
const isActiveColumn = {
  title: translate("active"),
  dataIndex: "isActive",
  width: 100,
  sorter: true,
  order: 9,
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