import { message, Tag } from "antd";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import translate from "@/features/Language/utility/translate";
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetchEntityRowsAsOptions";

// Regex patterns for validation
const pincodeRegex = /^\d{6}$/;
const contactNumberRegex = /^\+\d{1,3}[\s][6-9]\d{9}$/;

// fetch accounts
const fetchAccountsAsOptions = (value) => {
  let filters = {};
  if (value) {
    filters = { name: { $ilike: `%${value}%` } };
  }
  return fetchEntityRowsAsOptions("account", filters, 10, (accounts) => {
    return accounts.map((account) => {
      return { label: account.name, value: account.id };
    });
  });
};

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
    label: "id",
    hidden: true,
    disabled: true,
    hasFeedback: false,
    allowClear: false,
    input: {
      type: "Text",
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
  },
};

// Column configuration for "Is Active"
const isActiveColumn = {
  title: translate("status"),
  dataIndex: "isActive",
  width: 100,
  sorter: true,
  order: 2,
  render: (text) => {
    return text ? (
      <Tag color="green">Active</Tag>
    ) : (
      <Tag color="red">Inactive</Tag>
    );
  },
  createFormConfig: {
    name: "isActive",
    label: "status",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  updateFormConfig: {
    name: "isActive",
    label: "status",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
  queryFormConfig: {
    name: "isActive",
    label: "status",
    allowClear: false,
    rules: [{ type: "boolean" }],
    input: {
      type: "Switch",
    },
  },
};

// Column configuration for "Address Line 1"
const line1Column = {
  title: translate("address_line_1"),
  dataIndex: "line1",
  width: 150,
  sorter: true,
  order: 5,
  createFormConfig: {
    name: "line1",
    label: "address_line_1",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("address_line_1_is_required") },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "line1",
    label: "address_line_1",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("address_line_1_is_required") },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Address Line 2"
const line2Column = {
  title: translate("address_line_2"),
  dataIndex: "line2",
  width: 150,
  sorter: true,
  order: 6,
  createFormConfig: {
    name: "line2",
    label: "address_line_2",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("address_line_2_is_required") },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "line2",
    label: "address_line_2",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "address_line_2_is_required" }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Address Line 3"
const line3Column = {
  title: translate("address_line_3"),
  dataIndex: "line3",
  width: 150,
  sorter: true,
  order: 7,
  createFormConfig: {
    name: "line3",
    label: "address_line_3",
    allowClear: true,
    rules: [],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "line3",
    label: "address_line_3",
    allowClear: true,
    rules: [],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Landmark"
const landmarkColumn = {
  title: translate("landmark"),
  dataIndex: "landmark",
  width: 150,
  sorter: true,
  order: 8,
  createFormConfig: {
    name: "landmark",
    label: "landmark",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("landmark_is_required") }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "landmark",
    label: "Landmark",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("landmark_is_required") }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Area"
const areaColumn = {
  title: translate("area"),
  dataIndex: "area",
  width: 150,
  sorter: true,
  order: 9,
  createFormConfig: {
    name: "area",
    label: "area",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("area_is_required") }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "area",
    label: "area",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("area_is_required") }],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "area",
    label: "area",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "City"
const cityColumn = {
  title: translate("city"),
  dataIndex: "city",
  width: 150,
  sorter: true,
  order: 10,
  createFormConfig: {
    name: "city",
    label: "city",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("city_is_required") }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "city",
    label: "city",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("city_is_required") }],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "city",
    label: "city",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "District"
const districtColumn = {
  title: translate("district"),
  dataIndex: "district",
  width: 150,
  sorter: true,
  order: 11,
  createFormConfig: {
    name: "district",
    label: "district",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("district_is_required") }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "district",
    label: "district",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("district_is_required") }],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "district",
    label: "district",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "State"
const stateColumn = {
  title: "state",
  dataIndex: "state",
  width: 150,
  sorter: true,
  order: 12,
  createFormConfig: {
    name: "state",
    label: "state",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("state_is_required") }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "state",
    label: "state",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: translate("state_is_required") }],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "state",
    label: "state",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Pincode"
const pincodeColumn = {
  title: translate("pincode"),
  dataIndex: "pincode",
  width: 100,
  sorter: true,
  order: 13,
  createFormConfig: {
    name: "pincode",
    label: "pincode",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("pincode_is_required") },
      { pattern: pincodeRegex, message: translate("invalid_pincode") },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "pincode",
    label: "pincode",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("pincode_is_required") },
      { pattern: pincodeRegex, message: translate("invalid_pincode") },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Contact Name"
const contactNameColumn = {
  title: translate("contact_name"),
  dataIndex: "contactName",
  width: 150,
  sorter: true,
  order: 3,
  createFormConfig: {
    name: "contactName",
    label: "contact_name",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("contact_name_is_required") },
      {
        min: 5,
        max: 90,
        message: translate("contact_name_must_be_between_5_and_90_characters"),
      },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "contactName",
    label: "contact_name",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: translate("contact_name_is_required") },
      {
        min: 5,
        max: 90,
        message: translate("contact_name_must_be_between_5_and_90_characters"),
      },
    ],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "contactName",
    label: "contact_name",
    width: "s",
    rules: [],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Contact Number"
const contactNumberColumn = {
  title: translate("contact_number"),
  dataIndex: "contactNumber",
  width: 150,
  sorter: true,
  order: 4,
  createFormConfig: {
    name: "contactNumber",
    label: "contact_number",
    allowClear: true,
    rules: [
      { required: true, message: translate("contact_number_is_required") },
      { pattern: contactNumberRegex, message: translate("phone_is_not_valid") },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "contactNumber",
    label: "Contact Number",
    allowClear: true,
    rules: [
      { required: true, message: translate("contact_number_is_required") },
      { pattern: contactNumberRegex, message: translate("phone_is_not_valid") },
    ],
    input: {
      type: "Text",
    },
  },
  queryFormConfig: {
    name: "contactNumber",
    label: "contact_number",
    width: "s",
    rules: [{ type: "string" }],
    transformer: "ilike",
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Address Instructions"
const addressInstructionsColumn = {
  title: translate("address_instructions"),
  dataIndex: "addressInstructions",
  width: 150,
  sorter: true,
  order: 16,
  createFormConfig: {
    name: "addressInstructions",
    label: "address_instructions",
    allowClear: true,
    rules: [{ type: "string", min: 10, max: 350, required: true }],
    fieldProps: { rows: 5 },
    input: {
      type: "TextArea",
    },
  },
  updateFormConfig: {
    name: "addressInstructions",
    label: "address_instructions",
    allowClear: true,
    rules: [{ type: "string", min: 10, max: 350, required: true }],
    fieldProps: { rows: 5 },
    input: {
      type: "TextArea",
    },
  },
};

// Column configuration for "Latitude"
const latitudeColumn = {
  title: translate("latitude"),
  dataIndex: "latitude",
  width: 100,
  sorter: true,
  copyable: true,
  order: 14,
  createFormConfig: {
    name: "latitude",
    label: "latitude",
    allowClear: true,
    width: "100%",
    rules: [],
    input: {
      type: "Decimal",
      decimal: {
        min: -90,
        max: 90,
        precision: 6,
        step: 0.000001,
      },
    },
  },
  updateFormConfig: {
    name: "latitude",
    label: "latitude",
    allowClear: true,
    width: "100%",
    rules: [],
    input: {
      type: "Decimal",
      decimal: {
        min: -90,
        max: 90,
        precision: 6,
        step: 0.000001,
      },
    },
  },
};

// Column configuration for "Longitude"
const longitudeColumn = {
  title: translate('longitude'),
  dataIndex: "longitude",
  width: 100,
  sorter: true,
  copyable: true,
  order: 15,
  createFormConfig: {
    name: "longitude",
    label: "longitude",
    allowClear: true,
    width: "100%",
    rules: [],
    input: {
      type: "Decimal",
      decimal: {
        min: -180,
        max: 180,
        precision: 6,
        step: 0.000001,
      },
    },
  },
  updateFormConfig: {
    name: "longitude",
    label: "longitude",
    allowClear: true,
    width: "100%",
    rules: [],
    input: {
      type: "Decimal",
      decimal: {
        min: -180,
        max: 180,
        precision: 6,
        step: 0.000001,
      },
    },
  },
};

// Column configuration for "Account"
const account = {
  title: translate("account"),
  dataIndex: "account",
  copyable: false,
  width: 100,
  sorter: true,
  order: 16,
  hidden: true,
  createFormConfig: {
    name: "account",
    label: "account",
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^address\.manage$/, ifNoAccess: "disable" },
    rules: [{ required: false }],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: fetchAccountsAsOptions,
        debounceTimeout: 500,
      },
    },
  },
  updateFormConfig: {
    name: "account",
    label: "account",
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^address\.manage$/, ifNoAccess: "disable" },
    rules: [{ required: false }],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: fetchAccountsAsOptions,
        debounceTimeout: 500,
      },
    },
  },
  queryFormConfig: {
    name: "account",
    label: "account",
    rules: [],
    input: {
      type: "SelectRemoteOptions",
      select: {
        mode: "single",
        asyncOptionsFetcher: fetchAccountsAsOptions,
        debounceTimeout: 500,
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

// Column configuration array
const addressColumns = [
  idColumn,
  isActiveColumn,
  line1Column,
  line2Column,
  line3Column,
  landmarkColumn,
  areaColumn,
  cityColumn,
  districtColumn,
  stateColumn,
  pincodeColumn,
  contactNameColumn,
  contactNumberColumn,
  addressInstructionsColumn,
  latitudeColumn,
  longitudeColumn,
  account,
  ...timestampColumns,
];

export default addressColumns;
