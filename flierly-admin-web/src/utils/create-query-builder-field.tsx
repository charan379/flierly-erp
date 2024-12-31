import { translate } from "@/features/Locale/service/locale-state.service";
import { QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder"
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetch-entity-rows-as-options";

export const createTextQueryBuilderField = <T,>(params: { label: string, name: keyof T }): QueryFieldConfig<T> => {
    const { label, name } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: translate('equals_to'), namePath: 'equalTo' },
                formField: { input: { type: 'Text' } },
            },
            {
                condition: { label: translate('like'), namePath: 'like' },
                formField: { input: { type: 'Text' } },
            },
            {
                condition: { label: translate('ilike'), namePath: 'ilike' },
                formField: { input: { type: 'Text' } },
            },
            {
                condition: { label: translate('regex'), namePath: 'regex' },
                formField: { input: { type: 'Text' }, rules: [{ type: 'regexp' }] },
            },
            {
                condition: { label: translate('regexi'), namePath: 'regexi' },
                formField: { input: { type: 'Text' }, rules: [{ type: 'regexp' }] },
            },
            {
                condition: { label: translate('starts_with'), namePath: 'startsWith' },
                formField: { input: { type: 'Text' }, rules: [{ type: 'string' }] },
            },
            {
                condition: { label: translate('ends_with'), namePath: 'endsWith' },
                formField: { input: { type: 'Text' }, rules: [{ type: 'string' }] },
            },
        ],
    }
};

export const createNumberQueryBuilderField = <T,>(params: { label: string, name: keyof T }): QueryFieldConfig<T> => {
    const { label, name } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: translate('equals_to'), namePath: 'equalTo' },
                formField: { input: { type: 'Number' } },
            },
            {
                condition: { label: translate('between'), namePath: 'between' },
                formField: { input: { type: 'NumberRange' } },
            },
            {
                condition: { label: translate('greater_than'), namePath: 'greaterThan' },
                formField: { input: { type: 'Number' } },
            },
            {
                condition: { label: translate('less_than'), namePath: 'lessThan' },
                formField: { input: { type: 'Number' } },
            },
        ],
    }
};

export const createSelectQueryBuilderField = <T,>(params: { label: string, name: keyof T, options: { label: string, value: string }[] }): QueryFieldConfig<T> => {
    const { label, name, options } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: translate('equals_to'), namePath: 'equalTo' },
                formField: { input: { type: 'Select', options }, rules: [{ type: 'string' }] },
            },
            {
                condition: { label: translate('not_equals_to'), namePath: 'notEqualTo' },
                formField: { input: { type: 'Select', options }, rules: [{ type: 'string' }] },
            },
            {
                condition: { label: translate('in'), namePath: 'inArray' },
                formField: { input: { type: 'Select', options, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
            {
                condition: { label: translate('not_in'), namePath: 'notInArray' },
                formField: { input: { type: 'Select', options, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
        ],
    }
};

export const createBooleanQueryBuilderField = <T,>(params: { label: string, name: keyof T, optionLabels: Array<string> }): QueryFieldConfig<T> => {
    const { label, name, optionLabels } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: translate('equals_to'), namePath: 'equalTo' },
                formField: { input: { type: 'Select', options: [{ label: optionLabels[0], value: 'true' }, { label: optionLabels[1], value: 'false' }] }, rules: [{ type: 'string' }] },
            },
        ],
    }
};

export const createSelectRemoteOptionsQueryBuilderField = <T,>(params: { label: string, name: keyof T, asyncOptionsFetcher: (value: string) => Promise<{ label: string, value: string }[]> }): QueryFieldConfig<T> => {
    const { asyncOptionsFetcher, label, name } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: translate('equals_to'), namePath: 'equalTo' },
                formField: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300 } },
            },
            {
                condition: { label: translate('not_equals_to'), namePath: 'notEqualTo' },
                formField: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300 } },
            },
            {
                condition: { label: translate('in'), namePath: 'inArray' },
                formField: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
            {
                condition: { label: translate('not_in'), namePath: 'notInArray' },
                formField: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
        ],
    }
};

export const createAssociatedEntityRowQueryBuilderFiled = <T, AE>(params: { name: keyof T, label: string, associatedEntity: string, getLabel: (row: AE) => string, getValue: (row: AE) => any, getFilters: (value: string) => Partial<Record<keyof AE, any>> }): QueryFieldConfig<any> => {

    const { associatedEntity, getFilters, getLabel, getValue, label, name } = params;

    const asyncOptionsFetcher = (value: string) => fetchEntityRowsAsOptions<AE>(
        associatedEntity,
        getFilters(value),
        10,
        (rows) => rows.map((row) => ({ label: getLabel(row), value: getValue(row) }))
    );

    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: translate('equals_to'), namePath: 'equalTo' },
                formField: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300 } },
            },
            {
                condition: { label: translate('not_equals_to'), namePath: 'notEqualTo' },
                formField: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300 } },
            },
            {
                condition: { label: translate('in'), namePath: 'inArray' },
                formField: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
            {
                condition: { label: translate('not_in'), namePath: 'notInArray' },
                formField: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
        ],
    }
}
export const createDateQueryBuilderField = <T,>(params: { label: string, name: keyof T }): QueryFieldConfig<T> => {
    const { label, name } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: translate('between'), namePath: 'between' },
                formField: { input: { type: 'DateRange' } },
            },
            {
                condition: { label: translate('greater_than'), namePath: 'greaterThan' },
                formField: { input: { type: 'DatePicker' } },
            },
            {
                condition: { label: translate('less_than'), namePath: 'lessThan' },
                formField: { input: { type: 'DatePicker' } },
            },
        ],
    }
};

