
export default function buildMongoQuery(fieldsArray: string[], queriesArray: string[], withEOL?: boolean): { $and?: object[], $or?: object[] } {

    const query: { $and: object[], $or: object[] } = { $and: [{}], $or: [{}] };

    for (let i = 0; i < fieldsArray.length; i++) {
        const key = fieldsArray[i];
        const value = queriesArray[i];

        if (key && value) {
            if (value.match(/^[0-9a-fA-F]{24}$/)) {
                query.$and.push({ [key]: value })
            }
            else {
                query.$and.push({ [key]: { $regex: new RegExp(`${value}${withEOL ? "$" : ""}`, 'i') } })
            }
        }
        else {
            continue;
        }
    };

    return query;
}