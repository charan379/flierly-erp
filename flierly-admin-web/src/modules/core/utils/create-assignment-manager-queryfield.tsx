import { QueryFieldConfig } from "@/modules/core/components/QueryField";
import { Rule } from "antd/es/form";
import queryTransformers from "./query-transformers";

export interface AMQueryFieldConfig<T> {
    label: string
    name: keyof T
    queryField: QueryFieldConfig<T>
};

export const createNumericAMQueryField = <T,>(params: { label: string, name: keyof T, rules?: Rule[] }): AMQueryFieldConfig<T> => {
    const { label, name, rules } = params
    return {
        label,
        name,
        queryField: {
            input: { type: 'Number' },
            rules: [{ required: true, message: '' }, ...(rules ?? [])],
        },
    };
};

export const createTextAMQueryField = <T,>(params: { label: string, name: keyof T, rules?: Rule[] }): AMQueryFieldConfig<T> => {
    const { label, name, rules } = params;
    return {
        label,
        name,
        queryField: {
            input: { type: 'Text' },
            rules: [{ required: true, message: '' }, ...(rules ?? [])],
            transform: queryTransformers.iContains
        },
    };
};

export const createBooleanAMQueryField = <T,>(params: { label: string, name: keyof T, optionLabels: Array<string>, rules?: Rule[] }): AMQueryFieldConfig<T> => {
    const { label, name, optionLabels, rules } = params;
    return {
        label,
        name,
        queryField: {
            input: { type: 'Select', options: [{ label: optionLabels[0], value: 'true' }, { label: optionLabels[1], value: 'false' }] },
            rules: [{ required: true, message: '' }, ...(rules ?? [])],
        },
    };
};

export const createSelectAMQueryField = <T,>(params: { label: string, name: keyof T, options: Array<{ label: string, value: string }>, rules?: Rule[] }): AMQueryFieldConfig<T> => {
    const { label, name, options, rules } = params;
    return {
        label,
        name,
        queryField: {
            input: { type: 'Select', options },
            rules: [{ required: true, message: '' }, ...(rules ?? [])],
        },
    };
};

export const createSelectRemoteOptionsAMQueryField = <T,>(params: { label: string, name: keyof T, asyncOptionsFetcher: (value: string) => Promise<Array<{ label: string, value: string }>>, isMultiSelect?: boolean, rules?: Rule[] }): AMQueryFieldConfig<T> => {
    const { asyncOptionsFetcher, label, name, isMultiSelect, rules } = params;
    return {
        label,
        name,
        queryField: {
            input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, ...(isMultiSelect ? { mode: 'multiple' } : {}) },
            rules: [{ required: true, message: '' }, ...(rules ?? [])],
            ...(isMultiSelect ? { transform: queryTransformers.inArray } : {}),
        },
    };
}