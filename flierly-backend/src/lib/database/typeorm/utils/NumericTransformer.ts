import { ValueTransformer } from "typeorm";

export const NumericTransformer: ValueTransformer = {
    // Convert value to string before saving to the database
    to: (value: number | null): number | null => {
        return value !== null ? Number(value) : null;
    },

    // Convert value from string to number when retrieving from the database
    from: (value: string | null): number | null => {
        return value !== null ? Number(value) : null;
    },
};
