import translate from "@/features/Language/utility/translate";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";
import { Tag } from "antd";

// Options for active status
const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

const shortNameRegex = /^[a-zA-Z0-9]{1,15}$/;
const codeRegex = /^[a-z0-9]{1,10}$/;

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
  title: translate("uom_name"),
  dataIndex: "name",
  width: 180,
  sorter: true,
  order: 2,
  createFormConfig: {
    name: "name",
    label: "uom_name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("uom_name_is_required") },
      {
        min: 3,
        max: 90,
        message: translate("uom_name_must_be_between_3_and_90_characters"),
      },
      ({}) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("uom-name-validation-c-1", {
            entity: "uom",
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
    label: "uom_name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("uom_name_is_required") },
      {
        min: 3,
        max: 90,
        message: translate("uom_name_must_be_between_3_and_90_characters"),
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("uom-name-validation-u-1", {
            entity: "uom",
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
    label: "uom_name",
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

// Column configuration for "Short name"
const shortNameColumn = {
  title: translate("short_name"),
  dataIndex: "shortName",
  width: 180,
  sorter: true,
  order: 4,
  createFormConfig: {
    name: "shortName",
    label: "short_name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("short_name_is_required") },
      { min: 1, max: 15 },
      {
        pattern: shortNameRegex,
        message: translate("short_name_is_not_valid"),
      },
      ({}) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("short-name-validation-c-1", {
            entity: "uom",
            filters: { shortName: { $ilike: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "shortName",
    label: "short_name",
    hasFeedback: true,
    allowClear: false,
    rules: [
      { required: true, message: translate("short_name_is_required") },
      { min: 1, max: 15 },
      {
        pattern: shortNameRegex,
        message: translate("short_name_is_not_valid"),
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("short-name-validation-u-1", {
            entity: "uom",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              shortName: { $ilike: value },
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
    name: "shortName",
    label: "short_name",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Code"
const codeColumn = {
  title: translate("code"),
  dataIndex: "code",
  width: 180,
  sorter: true,
  order: 5,
  createFormConfig: {
    name: "code",
    label: "code",
    hasFeedback: false,
    allowClear: false,
    width: "100%",
    rules: [
      { type: "string", required: true },
      { pattern: codeRegex },
      { mix: 1, max: 10 },
      ({}) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("code-validation-c-1", {
            entity: "uom",
            filters: { code: { $like: value } },
          });
        },
      }),
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "code",
    label: "code",
    hasFeedback: false,
    allowClear: false,
    width: "100%",
    rules: [
      { type: "string", required: true },
      { pattern: codeRegex },
      { mix: 1, max: 10 },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) return Promise.resolve();
          return entityExistenceValidator("code-validation-u-1", {
            entity: "uom",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              code: { $like: value },
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
    name: "code",
    label: "code",
    width: "s",
    rules: [{ type: "string" }],
    input: {
      type: "Text",
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
const uomColumns = [
  idColumn,
  nameColumn,
  isActiveColumn,
  shortNameColumn,
  codeColumn,
  descriptionColumn,
  ...timestampColumns,
];

export default uomColumns;
