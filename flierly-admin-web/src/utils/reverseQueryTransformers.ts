type QueryValue = string | number | Date | undefined;

const reverseQueryTransformers = {
    // Helper function to safely access a nested property in an object
    getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] | undefined {
        return obj && key in obj ? obj[key] : undefined;
    },

    textWithRegex: (value: string): string | null => {
        const regexMatch = value?.match(/^\/(.*)\/([gimsuy]*)$/);
        return regexMatch ? regexMatch[1] : null;
    },

    inArray: (value: { $in: unknown[] }): unknown[] | undefined => {
        return Array.isArray(value?.$in) ? value.$in : undefined;
    },

    dateRange: (value: { $gte: QueryValue; $lte: QueryValue }): string[] | undefined => {
        const gte = value?.$gte;
        const lte = value?.$lte;

        // Ensure both gte and lte are valid values (not undefined or invalid dates)
        if (gte && lte && gte instanceof Date && lte instanceof Date && !isNaN(gte.getTime()) && !isNaN(lte.getTime())) {
            return [gte.toISOString().split('T')[0], lte.toISOString().split('T')[0]]; // 'YYYY-MM-DD'
        }

        return undefined;
    },

    greaterThanOrEqual: (value: { $gte: QueryValue }): QueryValue | undefined => {
        return value?.$gte;
    },

    lessThanOrEqual: (value: { $lte: QueryValue }): QueryValue | undefined => {
        return value?.$lte;
    },

    greaterThan: (value: { $gt: QueryValue }): QueryValue | undefined => {
        return value?.$gt;
    },

    lessThan: (value: { $lt: QueryValue }): QueryValue | undefined => {
        return value?.$lt;
    },

    notEqual: (value: { $ne: QueryValue }): QueryValue | undefined => {
        return value?.$ne;
    },

    between: (value: { $between: unknown[] }): unknown[] | undefined => {
        return Array.isArray(value?.$between) ? value.$between : undefined;
    },

    notBetween: (value: { $notBetween: unknown[] }): unknown[] | undefined => {
        return Array.isArray(value?.$notBetween) ? value.$notBetween : undefined;
    },

    isNull: (value: { $isNull: boolean }): boolean | undefined => {
        return value?.$isNull === true ? true : undefined;
    },

    isNotNull: (value: { $isNotNull: boolean }): boolean | undefined => {
        return value?.$isNotNull === true ? true : undefined;
    },

    like: (value: { $like: string }): string | undefined => {
        return typeof value?.$like === 'string' ? value.$like.replace(/%/g, '') : undefined;
    },

    notLike: (value: { $notLike: string }): string | undefined => {
        return typeof value?.$notLike === 'string' ? value.$notLike.replace(/%/g, '') : undefined;
    },

    ilike: (value: { $ilike: string }): string | undefined => {
        return typeof value?.$ilike === 'string' ? value.$ilike.replace(/%/g, '') : undefined;
    },

    notIlike: (value: { $notIlike: string }): string | undefined => {
        return typeof value?.$notIlike === 'string' ? value.$notIlike.replace(/%/g, '') : undefined;
    },

    startsWith: (value: { $startsWith: string }): string | undefined => {
        return typeof value?.$startsWith === 'string' ? value.$startsWith : undefined;
    },

    notStartsWith: (value: { $notStartsWith: string }): string | undefined => {
        return typeof value?.$notStartsWith === 'string' ? value.$notStartsWith : undefined;
    },

    endsWith: (value: { $endsWith: string }): string | undefined => {
        return typeof value?.$endsWith === 'string' ? value.$endsWith : undefined;
    },

    notEndsWith: (value: { $notEndsWith: string }): string | undefined => {
        return typeof value?.$notEndsWith === 'string' ? value.$notEndsWith : undefined;
    },

    regex: (value: { $regex: string }): string | undefined => {
        return typeof value?.$regex === 'string' ? value.$regex : undefined;
    },

    notRegex: (value: { $notRegex: string }): string | undefined => {
        return typeof value?.$notRegex === 'string' ? value.$notRegex : undefined;
    },

    regexi: (value: { $regex: string }): string | undefined => {
        return typeof value?.$regex === 'string' ? value.$regex : undefined;
    },

    notRegexi: (value: { $notRegex: string }): string | undefined => {
        return typeof value?.$notRegex === 'string' ? value.$notRegex : undefined;
    }
};

export default reverseQueryTransformers;
