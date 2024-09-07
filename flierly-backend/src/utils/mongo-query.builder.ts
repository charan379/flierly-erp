/**
 * @deprecated
 * @param fieldsArray 
 * @param queriesArray 
 * @param withEOL 
 * @returns 
 */
export default function buildMongoQuery(fieldsArray: string[], queriesArray: string[], withEOL?: boolean): MongoQueryArray {

    const query: MongoQueryArray = [];

    for (let i = 0; i < fieldsArray.length; i++) {
        const key = fieldsArray[i];
        const value = queriesArray[i];

        if (key && value) {
            if (value.match(/^[0-9a-fA-F]{24}$/)) {
                query.push({ [key]: value })
            }
            else {
                query.push({ [key]: { $regex: new RegExp(`${value}${withEOL ? "$" : ""}`, 'i') } })
            }
        }
        else {
            continue;
        }
    };

    return query;
}