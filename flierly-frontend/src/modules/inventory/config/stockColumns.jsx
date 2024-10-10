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
    transformer: "inArray",
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

// Column configuration for "Uom"
const uom = {
  title: translate("uom"),
  dataIndex: "uom",
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
    name: "uom",
    label: "uom",
    allowClear: false,
    hasFeedback: true,
    access: { permission: /^uom\.create$/, ifNoAccess: "disable" },
    dependencies: ["product"],
    rules: [
      { required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          const productId = getFieldValue("product");

          if (!value || !productId) return Promise.resolve();
          return entityExistenceValidator("stock-product-uom-validation-c-1", {
            entity: "stock",
            filters: {
              product: productId,
              uom: value,
            },
          });
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
    name: "uom",
    label: "uom",
    allowClear: false,
    hasFeedback: true,
    access: { permission: /^uom\.update$/, ifNoAccess: "disable" },
    dependencies: ["product"],
    rules: [
      { required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          const productId = getFieldValue("product");

          if (!value || !productId) return Promise.resolve();
          return entityExistenceValidator("stock-product-uom-validation-u-1", {
            entity: "stock",
            filters: {
              id: { $notEqualTo: getFieldValue("id") },
              product: productId,
              uom: value,
            },
          });
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
    name: "uom",
    label: "uom",
    rules: [],
    transformer: "inArray",
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

// Column configuration for "Quantity"
const quantityColumn = {
  title: translate("quantity"),
  dataIndex: "quantity",
  width: 100,
  sorter: true,
  copyable: true,
  order: 5,
  createFormConfig: {
    name: "quantity",
    label: "quantity",
    allowClear: true,
    width: "100%",
    rules: [{ type: "number", required: true }],
    input: {
      type: "Decimal",
      decimal: {
        min: 0,
        precision: 2,
        step: 0.01,
      },
    },
  },
  updateFormConfig: {
    name: "quantity",
    label: "quantity",
    allowClear: true,
    width: "100%",
    rules: [{ type: "number", required: true }],
    input: {
      type: "Decimal",
      decimal: {
        min: 0,
        precision: 2,
        step: 0.01,
      },
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
const stockColumns = [
  idColumn,
  isActiveColumn,
  productColumn,
  uom,
  quantityColumn,
  ...timestampColumns,
];

export default stockColumns;
