// Column configuration for "Created"
export const createdAtColumn = {
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

// Column configuration for "Updated"
export const updatedAtColumn = {
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

// Column configuration for "Deleted"
export const deletedAtColumn = {
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

const timeStampColumns = [createdAtColumn, updatedAtColumn, deletedAtColumn];

export default timeStampColumns;