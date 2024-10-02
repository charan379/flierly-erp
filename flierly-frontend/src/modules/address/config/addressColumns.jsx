import { Tag } from "antd";
import generateTimeStampColumns from "@/utils/column-generators/generateTimeStampColumns";
import translate from "@/features/Language/utility/translate";

// Regex patterns for validation
const pincodeRegex = /^\d{6}$/;
const contactNumberRegex = /^\+\d{1,3}[\s][6-9]\d{9}$/;

// Column configuration for "ID"
const idColumn = {
  title: translate("id"),
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

// Column configuration for "Address Line 1"
const line1Column = {
  title: "Address Line 1",
  dataIndex: "line1",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "line1",
    label: "Address Line 1",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Address line 1 must not be empty." }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "line1",
    label: "Address Line 1",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Address line 1 must not be empty." }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Address Line 2"
const line2Column = {
  title: "Address Line 2",
  dataIndex: "line2",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "line2",
    label: "Address Line 2",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Address line 2 must not be empty." }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "line2",
    label: "Address Line 2",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Address line 2 must not be empty." }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Address Line 3"
const line3Column = {
  title: "Address Line 3",
  dataIndex: "line3",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "line3",
    label: "Address Line 3",
    allowClear: true,
    rules: [],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "line3",
    label: "Address Line 3",
    allowClear: true,
    rules: [],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Landmark"
const landmarkColumn = {
  title: "Landmark",
  dataIndex: "landmark",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "landmark",
    label: "Landmark",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Landmark must not be empty." }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "landmark",
    label: "Landmark",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Landmark must not be empty." }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Area"
const areaColumn = {
  title: "Area",
  dataIndex: "area",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "area",
    label: "Area",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Area must not be empty." }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "area",
    label: "Area",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "Area must not be empty." }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "City"
const cityColumn = {
  title: "City",
  dataIndex: "city",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "city",
    label: "city",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "City must not be empty." }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "city",
    label: "City",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "City must not be empty." }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "District"
const districtColumn = {
  title: "District",
  dataIndex: "district",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "district",
    label: "District",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "District must not be empty." }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "district",
    label: "District",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "District must not be empty." }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "State"
const stateColumn = {
  title: "State",
  dataIndex: "state",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "state",
    label: "State",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "State must not be empty." }],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "state",
    label: "State",
    hasFeedback: true,
    allowClear: true,
    rules: [{ required: true, message: "State must not be empty." }],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Pincode"
const pincodeColumn = {
  title: "Pincode",
  dataIndex: "pincode",
  width: 100,
  sorter: true,
  createFormConfig: {
    name: "pincode",
    label: "Pincode",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: "Pincode must not be empty." },
      { pattern: pincodeRegex, message: "Pincode must be a 6-digit number." },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "pincode",
    label: "Pincode",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: true, message: "Pincode must not be empty." },
      { pattern: pincodeRegex, message: "Pincode must be a 6-digit number." },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Contact Name"
const contactNameColumn = {
  title: "Contact Name",
  dataIndex: "contactName",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "contactName",
    label: "Contact Name",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: false },
      { min: 5, max: 90, message: 'Contact name must be between 5 and 90 characters.' },
    ],
    input: {
      type: "Text",
    },
  },
  updateFormConfig: {
    name: "contactName",
    label: "Contact Name",
    hasFeedback: true,
    allowClear: true,
    rules: [
      { required: false },
      { min: 5, max: 90, message: 'Contact name must be between 5 and 90 characters.' },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Contact Number"
const contactNumberColumn = {
  title: "Contact Number",
  dataIndex: "contactNumber",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "contactNumber",
    label: "Contact Number",
    allowClear: true,
    rules: [
      { required: false },
      { pattern: contactNumberRegex, message: 'Contact number must be in the format: +<country_code> <10-digit_number>' },
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
      { required: false },
      { pattern: contactNumberRegex, message: 'Contact number must be in the format: +<country_code> <10-digit_number>' },
    ],
    input: {
      type: "Text",
    },
  },
};

// Column configuration for "Address Instructions"
const addressInstructionsColumn = {
  title: "Address Instructions",
  dataIndex: "addressInstructions",
  width: 150,
  sorter: true,
  createFormConfig: {
    name: "addressInstructions",
    label: "Address Instructions",
    allowClear: true,
    rules: [],
    input: {
      type: "TextArea",
    },
  },
  updateFormConfig: {
    name: "addressInstructions",
    label: "Address Instructions",
    allowClear: true,
    rules: [],
    input: {
      type: "TextArea",
    },
  },
};

// Column configuration for "Latitude"
const latitudeColumn = {
  title: "Latitude",
  dataIndex: "latitude",
  width: 100,
  sorter: true,
  createFormConfig: {
    name: "latitude",
    label: "Latitude",
    allowClear: true,
    width: "100%",
    rules: [{ type: "number", message: "Latitude must be a number." }],
    input: {
      type: "Number",
    },
  },
  updateFormConfig: {
    name: "latitude",
    label: "Latitude",
    allowClear: true,
    width: "100%",
    rules: [{ type: "number", message: "Latitude must be a number." }],
    input: {
      type: "Number",
    },
  },
};

// Column configuration for "Longitude"
const longitudeColumn = {
  title: "Longitude",
  dataIndex: "longitude",
  width: 100,
  sorter: true,
  createFormConfig: {
    name: "longitude",
    label: "Longitude",
    allowClear: true,
    width: "100%",
    rules: [{ type: "number", message: "Longitude must be a number." }],
    input: {
      type: "Number",
    },
  },
  updateFormConfig: {
    name: "longitude",
    label: "Longitude",
    allowClear: true,
    width: "100%",
    rules: [{ type: "number", message: "Longitude must be a number." }],
    input: {
      type: "Number",
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
  ...timestampColumns,
];

export default addressColumns;