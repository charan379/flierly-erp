const queryTransformers = {
    textWithRegex: (value, namePath, allValues) => {
        if (value)
            return `/${value}/i`;
        else
            return null;
    },
    inArray: (value, namePath, allValues) => {
        if (typeof value === "object" && value?.length > 0)
            return { [namePath]: { $in: value } };
        else
            return null
    },
    dateRange: (value, namePath, allValues) => {
        if (typeof value === "object" && value?.length > 0)
            return { [namePath]: { $gte: new Date(value[0]).toISOString(), $lte: new Date(value[1]).toISOString() } }
        else
            return null
    }
}

export default queryTransformers;