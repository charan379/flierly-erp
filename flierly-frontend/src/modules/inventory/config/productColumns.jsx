import translate from "@/features/Language/utility/translate";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import { Tag } from "antd";

// Options for active status
const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

const skuRegex = /^[a-zA-Z0-9_-]{3,50}$/;

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
  title: translate("product_name"),
  dataIndex: "name",
  width: 180,
  sorter: true,
  order: 2,
  createFormConfig: {
    name: "name",
    label: "product_name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("product_name_is_required") },
      {
        min: 3,
        max: 90,
        message: translate("product_name_must_be_between_3_and_90_characters"),
      },
      ({}) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("product-name-validation-c-1", {
            entity: "product",
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
    label: "product_name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("product_name_is_required") },
      {
        min: 3,
        max: 90,
        message: translate("product_name_must_be_between_3_and_90_characters"),
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("product-name-validation-u-1", {
            entity: "product",
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
    label: "product_name",
    rules: [{ type: "regexp" }],
    width: "s",
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Is Active"
const isActiveColumn = {
  title: translate("status"),
  dataIndex: "isActive",
  width: 80,
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

// Column configuration for "SKU"
const skuColumn = {
  title: translate("sku"),
  dataIndex: "sku",
  width: 180,
  sorter: true,
  order: 4,
  createFormConfig: {
    name: "sku",
    label: "sku",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("sku_is_required") },
      { pattern: skuRegex, message: translate("sku_is_not_valid") },
      ({}) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("sku-validation-c-1", {
            entity: "product",
            filters: { sku: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "sku",
    label: "sku",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("sku_is_required") },
      { pattern: skuRegex, message: translate("sku_is_not_valid") },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve();
          return entityExistenceValidator("sku-validation-u-1", {
            entity: "product",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              sku: { $ilike: value },
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
    name: "sku",
    label: "sku",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "HSN"
const hsnColumn = {
  title: translate("hsn"),
  dataIndex: "hsn",
  width: 180,
  sorter: true,
  order: 5,
  createFormConfig: {
    name: "hsn",
    label: "hsn",
    hasFeedback: false,
    allowClear: false,
    width: "100%",
    rules: [
      { type: "number" },
      ({}) => ({
        validator(_, value) {
          if (value === undefined || !value) return Promise.resolve();
          return entityExistenceValidator("hsn-validation-c-1", {
            entity: "product",
            filters: { hsn: value },
          });
        },
      }),
    ],
    input: {
      type: "Number",
    },
  },
  updateFormConfig: {
    name: "hsn",
    label: "hsn",
    hasFeedback: false,
    allowClear: false,
    width: "100%",
    rules: [
      { type: "number" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined || !value) return Promise.resolve();
          return entityExistenceValidator("hsn-validation-u-1", {
            entity: "product",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              hsn: value,
            },
          });
        },
      }),
    ],
    input: {
      type: "Number",
    },
  },
  queryFormConfig: {
    name: "hsn",
    label: "hsn",
    width: "s",
    rules: [{ type: "number" }],
    input: {
      type: "Number",
    },
  },
};

const descriptionColumn = {
  title: translate("description"),
  dataIndex: "description",
  copyable: false,
  width: 200,
  order: 6,
  createFormConfig: {
    name: "description",
    label: "description",
    rules: [{ type: "string", min: 20, max: 250, required: false }],
    fieldProps: { rows: 4 },
    input: {
      type: "TextArea",
    },
  },
  updateFormConfig: {
    name: "description",
    label: "description",
    rules: [{ type: "string", min: 20, max: 250, required: false }],
    fieldProps: { rows: 5 },
    input: {
      type: "TextArea",
    },
  },
  queryFormConfig: {
    name: "description",
    label: "description",
    rules: [{ type: "string", min: 20, max: 250, required: false }],
    fieldProps: { rows: 1 },
    transformer: "ilike",
    input: {
      type: "TextArea",
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

// Column Configuration Array
const productColumns = [
  idColumn,
  nameColumn,
  isActiveColumn,
  skuColumn,
  hsnColumn,
  descriptionColumn,
  ...timestampColumns,
];

export default productColumns;
