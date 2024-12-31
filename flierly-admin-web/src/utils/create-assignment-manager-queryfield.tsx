import { FormFieldConfig } from "@/components/FormField";
import { Rule } from "antd/es/form";
import queryTransformers from "./query-transformers";

export interface AMQueryFieldConfig<T> {
    label: string
    name: keyof T
    formField: FormFieldConfig<T>
};

export const createNumericAMQueryField = <T,>(params: { label: string, name: keyof T, rules?: Rule[] }): AMQueryFieldConfig<T> => {
    const { label, name, rules } = params
    return {
        label,
        name,
        formField: {
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
        formField: {
            input: { type: 'Text' },
            rules: [{ required: true, message: '' }, ...(rules ?? [])],
            transform: queryTransformers.ilike
        },
    };
};

export const createBooleanAMQueryField = <T,>(params: { label: string, name: keyof T, optionLabels: Array<string>, rules?: Rule[] }): AMQueryFieldConfig<T> => {
    const { label, name, optionLabels, rules } = params;
    return {
        label,
        name,
        formField: {
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
        formField: {
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
        formField: {
            input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, ...(isMultiSelect ? { mode: 'multiple' } : {}) },
            rules: [{ required: true, message: '' }, ...(rules ?? [])],
            ...(isMultiSelect ? { transform: queryTransformers.inArray } : {}),
        },
    };
}