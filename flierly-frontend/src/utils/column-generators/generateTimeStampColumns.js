// Timestamp columns definition
const createdAtColumn = {
  title: "Created",
  dataIndex: "createdAt",
  width: 10,
  order: 98,
  valueType: "dateTime",
  sorter: true,
  queryFormConfig: {
    name: "createdAt",
    label: "created_at",
    rules: [],
    transformer: "between",
    order: 5,
    input: {
      type: "DateRange",
    },
  },
};

const updatedAtColumn = {
  title: "Updated",
  dataIndex: "updatedAt",
  width: 10,
  order: 99,
  valueType: "dateTime",
  sorter: true,
  queryFormConfig: {
    name: "updatedAt",
    label: "updated_at",
    rules: [],
    transformer: "between",
    order: 6,
    input: {
      type: "DateRange",
    },
  },
};

const deletedAtColumn = {
  title: "Deleted",
  dataIndex: "deletedAt",
  width: 10,
  order: 100,
  valueType: "dateTime",
  sorter: true,
  queryFormConfig: {
    name: "deletedAt",
    label: "deleted_at",
    rules: [],
    transformer: "between",
    order: 7,
    input: {
      type: "DateRange",
    },
  },
};

// Function to dynamically return timestamp columns based on the arguments passed
function generateTimeStampColumns() {
  const columnsMap = {
    createdAt: createdAtColumn,
    updatedAt: updatedAtColumn,
    deletedAt: deletedAtColumn,
  };

  const args = Array.from(arguments);

  // If no arguments are passed, return all three columns
  if (args.length === 0) {
    return [createdAtColumn, updatedAtColumn, deletedAtColumn];
  }

  // Return only the columns that match the provided arguments
  return args
    .map(function (arg) {
      return columnsMap[arg];
    })
    .filter(Boolean);
}

// Export or use the function as needed
export default generateTimeStampColumns;
