import { mergeDeep } from "../mergeDeep";

// Column configuration for "ID"
const idColumn = {
  title: "ID",
  dataIndex: "id",
  width: 2,
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

/**
 * Retrieves the idColumn configuration merged with any
 * provided custom configuration.
 *
 * @param {Object} [customConfig={}] - An optional object containing
 * additional configurations that will override the defaults.
 * @returns {Object} - The resulting idColumn configuration.
 */
function generateIdColumn(customConfig = {}) {
  return mergeDeep(JSON.parse(JSON.stringify(idColumn)), customConfig);
}

// Export the idColumn and the generateIdColumn function
export { idColumn, generateIdColumn };
