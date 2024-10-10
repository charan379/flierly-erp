import translate from "@/features/Language/utility/translate";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import { Tag } from "antd";
import fetchProductsAsOptions from "../utils/fetchProductsAsOptions";
import fetchUomsAsOptions from "../utils/fetchUomsAsOptions";
import entityExistenceValidator from "@/utils/validators/entityExistenceValidator";

// Options for active status
const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

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

// Column configuration for "Is Active"
const isActiveColumn = {
  title: translate("status"),
  dataIndex: "isActive",
  width: 80,
  align: "center",
  order: 2,
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

// Column configuration for "Product"
const productColumn = {
  title: translate("product"),
  dataIndex: "product",
  copyable: false,
  width: 150,
  sorter: true,
  order: 3,
  render: (value, record, index, action) => {
    if (value && typeof value === "object") {
      return value?.name;
    } else {
      return value;
    }
  },
  createFormConfig: {
    name: "product",
    label: "product",
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^product\.create$/, ifNoAccess: "disable" },
    rules: [{ required: true }],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: (value, signal) =>
          fetchProductsAsOptions(value, signal),
        debounceTimeout: 500,
      },
    },
  },
  updateFormConfig: {
    name: "product",
    label: "product",
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^product\.update$/, ifNoAccess: "disable" },
    rules: [{ required: true }],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: (value, signal) =>
          fetchProductsAsOptions(value, signal),
        debounceTimeout: 500,
      },
    },
  },
  queryFormConfig: {
    name: "product",
    label: "product",
    rules: [],
    transformer: 'inArray',
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "multiple",
        asyncOptionsFetcher: (value, signal) =>
          fetchProductsAsOptions(value, signal),
        debounceTimeout: 500,
      },
    },
  },
};

// Column configuration for "From Uom"
const fromUomColumn = {
  title: translate("from_uom"),
  dataIndex: "fromUom",
  copyable: false,
  width: 150,
  sorter: true,
  order: 4,
  render: (value, record, index, action) => {
    if (value && typeof value === "object") {
      return value?.name;
    } else {
      return value;
    }
  },
  createFormConfig: {
    name: "fromUom",
    label: "from_uom",
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^uom\.create$/, ifNoAccess: "disable" },
    rules: [{ required: true }],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: (value, signal) =>
          fetchUomsAsOptions(value, signal),
        debounceTimeout: 500,
      },
    },
  },
  updateFormConfig: {
    name: "fromUom",
    label: "from_uom",
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^uom\.update$/, ifNoAccess: "disable" },
    rules: [{ required: true }],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: (value, signal) =>
          fetchUomsAsOptions(value, signal),
        debounceTimeout: 500,
      },
    },
  },
  queryFormConfig: {
    name: "fromUom",
    label: "from_uom",
    rules: [],
    transformer: 'inArray',
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "multiple",
        asyncOptionsFetcher: (value, signal) =>
            fetchUomsAsOptions(value, signal),
        debounceTimeout: 500,
      },
    },
  },
};

// Column configuration for "To Uom"
const toUomColumn = {
  title: translate("to_uom"),
  dataIndex: "toUom",
  copyable: false,
  width: 150,
  sorter: true,
  order: 5,
  render: (value, record, index, action) => {
    if (value && typeof value === "object") {
      return value?.name;
    } else {
      return value;
    }
  },
  createFormConfig: {
    name: "toUom",
    label: "to_uom",
    allowClear: false,
    hasFeedback: true,
    access: { permission: /^uom\.create$/, ifNoAccess: "disable" },
    dependencies: ["product", "fromUom", "toUom"],
    rules: [
      { required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          const productId = getFieldValue("product")?.id;
          const fromUomId = getFieldValue("fromUom")?.id;
          const toUomId = getFieldValue("toUom")?.id;

          if (!value || !productId || !fromUomId || !toUomId)
            return Promise.resolve();
          return entityExistenceValidator(
            "product-to-from-uoms-validation-c-1",
            {
              entity: "uom-convertion",
              filters: {
                product: productId,
                fromUom: fromUomId,
                toUom: toUomId,
              },
            }
          );
        },
      }),
    ],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: (value, signal) =>
          fetchUomsAsOptions(value, signal),
        debounceTimeout: 500,
      },
    },
  },
  updateFormConfig: {
    name: "toUom",
    label: "to_uom",
    allowClear: false,
    hasFeedback: true,
    access: { permission: /^uom\.update$/, ifNoAccess: "disable" },
    dependencies: ["product", "fromUom", "toUom"],
    rules: [
      { required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          const productId = getFieldValue("product")?.id;
          const fromUomId = getFieldValue("fromUom")?.id;
          const toUomId = getFieldValue("toUom")?.id;

          if (!value || !productId || !fromUomId || !toUomId)
            return Promise.resolve();
          return entityExistenceValidator(
            "product-to-from-uoms-validation-u-1",
            {
              entity: "uom-convertion",
              filters: {
                product: productId,
                fromUom: fromUomId,
                toUom: toUomId,
              },
            }
          );
        },
      }),
    ],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: (value, signal) =>
          fetchUomsAsOptions(value, signal),
        debounceTimeout: 500,
      },
    },
  },
  queryFormConfig: {
    name: "toUom",
    label: "to_uom",
    rules: [],
    transformer: 'inArray',
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "multiple",
        asyncOptionsFetcher: (value, signal) =>
          fetchUomsAsOptions(value, signal),
        debounceTimeout: 500,
      },
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
    rules: [{ type: "string", min: 10, max: 250, required: false }],
    fieldProps: { rows: 4 },
    input: {
      type: "TextArea",
    },
  },
  updateFormConfig: {
    name: "description",
    label: "description",
    rules: [{ type: "string", min: 10, max: 250, required: false }],
    fieldProps: { rows: 5 },
    input: {
      type: "TextArea",
    },
  },
  queryFormConfig: {
    name: "description",
    label: "description",
    rules: [{ type: "string", max: 250, required: false }],
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
const uomConvertionColumns = [
  idColumn,
  isActiveColumn,
  productColumn,
  fromUomColumn,
  toUomColumn,
  descriptionColumn,
  ...timestampColumns,
];

export default uomConvertionColumns;
