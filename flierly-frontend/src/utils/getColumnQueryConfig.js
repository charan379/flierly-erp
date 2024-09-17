import hasOwnProperty from "./hasOwnProperty";

const getColumnQueryConfig = ({ field, columns, required }) => {
    const columnsIndex = columns.findIndex((column) => column['dataIndex'] === field)

    if (columnsIndex === -1) {
        throw new Error(`Columns doesn't exist : ${field}.`);
    };

    if (!hasOwnProperty(columns[columnsIndex], 'queryFormConfig')) {
        throw new Error(`Query Config doesn't exist for : ${field}.`);
    };

    let queryConfig = columns[columnsIndex].queryFormConfig;

    if (required) {
        queryConfig = { ...queryConfig, rules: [...queryConfig.rules, { required: true }] }
    };

    return queryConfig;
};

export default getColumnQueryConfig;