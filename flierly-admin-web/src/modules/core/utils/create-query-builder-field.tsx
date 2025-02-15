import { translate as t } from "../features/Locale/service/locale-state.service";
import { QueryBuilderFieldConfig } from "../features/QueryBuilder/QueryBuilder";
import fetchEntityRecordsAsOptions from "../features/SelectRemoteOptions/utils/fetch-entity-rows-as-options";

export const createTextQueryBuilderField = <T,>(params: { label: string, name: keyof T }): QueryBuilderFieldConfig<T> => {
    const { label, name } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: t('label.query_equals_to'), namePath: 'equalTo' },
                queryFieldConfig: { input: { type: 'Text' } },
            },
            {
                condition: { label: t('label.query_contains'), namePath: 'contains' },
                queryFieldConfig: { input: { type: 'Text' } },
            },
            {
                condition: { label: t('label.query_not_contains'), namePath: 'notContains' },
                queryFieldConfig: { input: { type: 'Text' } },
            },
            {
                condition: { label: t('label.query_icontains'), namePath: 'iContains' },
                queryFieldConfig: { input: { type: 'Text' } },
            },
            {
                condition: { label: t('label.query_not_icontains'), namePath: 'notIContains' },
                queryFieldConfig: { input: { type: 'Text' } },
            },
            {
                condition: { label: t('label.query_regex'), namePath: 'regex' },
                queryFieldConfig: { input: { type: 'Text' }, rules: [{ type: 'regexp' }] },
            },
            {
                condition: { label: t('label.query_regexi'), namePath: 'regexi' },
                queryFieldConfig: { input: { type: 'Text' }, rules: [{ type: 'regexp' }] },
            },
            {
                condition: { label: t('label.query_starts_with'), namePath: 'startsWith' },
                queryFieldConfig: { input: { type: 'Text' }, rules: [{ type: 'string' }] },
            },
            {
                condition: { label: t('label.query_ends_with'), namePath: 'endsWith' },
                queryFieldConfig: { input: { type: 'Text' }, rules: [{ type: 'string' }] },
            },
        ],
    }
};

export const createNumberQueryBuilderField = <T,>(params: { label: string, name: keyof T }): QueryBuilderFieldConfig<T> => {
    const { label, name } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: t('label.query_equals_to'), namePath: 'equalTo' },
                queryFieldConfig: { input: { type: 'Number' } },
            },
            {
                condition: { label: t('label.query_between'), namePath: 'between' },
                queryFieldConfig: { input: { type: 'NumberRange' } },
            },
            {
                condition: { label: t('label.query_greater_than'), namePath: 'greaterThan' },
                queryFieldConfig: { input: { type: 'Number' } },
            },
            {
                condition: { label: t('label.query_less_than'), namePath: 'lessThan' },
                queryFieldConfig: { input: { type: 'Number' } },
            },
        ],
    }
};

export const createSelectQueryBuilderField = <T,>(params: { label: string, name: keyof T, options: { label: string, value: string }[] }): QueryBuilderFieldConfig<T> => {
    const { label, name, options } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: t('label.query_equals_to'), namePath: 'equalTo' },
                queryFieldConfig: { input: { type: 'Select', options }, rules: [{ type: 'string' }] },
            },
            {
                condition: { label: t('label.query_not_equals_to'), namePath: 'notEqualTo' },
                queryFieldConfig: { input: { type: 'Select', options }, rules: [{ type: 'string' }] },
            },
            {
                condition: { label: t('label.query_in'), namePath: 'inArray' },
                queryFieldConfig: { input: { type: 'Select', options, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
            {
                condition: { label: t('label.query_not_in'), namePath: 'notInArray' },
                queryFieldConfig: { input: { type: 'Select', options, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
        ],
    }
};

export const createBooleanQueryBuilderField = <T,>(params: { label: string, name: keyof T, optionLabels: Array<string> }): QueryBuilderFieldConfig<T> => {
    const { label, name, optionLabels } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: t('label.query_equals_to'), namePath: 'equalTo' },
                queryFieldConfig: { input: { type: 'Select', options: [{ label: optionLabels[0], value: 'true' }, { label: optionLabels[1], value: 'false' }] }, rules: [{ type: 'string' }] },
            },
        ],
    }
};

export const createSelectRemoteOptionsQueryBuilderField = <T,>(params: { label: string, name: keyof T, asyncOptionsFetcher: (value: string) => Promise<{ label: string, value: string }[]> }): QueryBuilderFieldConfig<T> => {
    const { asyncOptionsFetcher, label, name } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: t('label.query_equals_to'), namePath: 'equalTo' },
                queryFieldConfig: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300 } },
            },
            {
                condition: { label: t('label.query_not_equals_to'), namePath: 'notEqualTo' },
                queryFieldConfig: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300 } },
            },
            {
                condition: { label: t('label.query_in'), namePath: 'inArray' },
                queryFieldConfig: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
            {
                condition: { label: t('label.query_not_in'), namePath: 'notInArray' },
                queryFieldConfig: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
        ],
    }
};

export const createAssociatedEntityRowQueryBuilderFiled = <T, AE>(params: { name: keyof T, label: string, associatedEntity: string, getLabel: (row: AE) => string, getValue: (row: AE) => any, getFilters: (value: string) => Partial<Record<keyof AE, any>> }): QueryBuilderFieldConfig<any> => {

    const { associatedEntity, getFilters, getLabel, getValue, label, name } = params;

    const asyncOptionsFetcher = (value: string) => fetchEntityRecordsAsOptions<AE>(
        associatedEntity,
        getFilters(value),
        10,
        (rows) => rows.map((row) => ({ label: getLabel(row), value: getValue(row) }))
    );

    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: t('label.query_equals_to'), namePath: 'equalTo' },
                queryFieldConfig: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300 } },
            },
            {
                condition: { label: t('label.query_not_equals_to'), namePath: 'notEqualTo' },
                queryFieldConfig: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300 } },
            },
            {
                condition: { label: t('label.query_in'), namePath: 'inArray' },
                queryFieldConfig: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
            {
                condition: { label: t('label.query_not_in'), namePath: 'notInArray' },
                queryFieldConfig: { input: { type: 'SelectRemoteOptions', asyncOptionsFetcher, debounceTimeout: 300, mode: 'multiple' }, rules: [{ type: 'array' }] },
            },
        ],
    }
}
export const createDateQueryBuilderField = <T,>(params: { label: string, name: keyof T }): QueryBuilderFieldConfig<T> => {
    const { label, name } = params;
    return {
        field: { label, namePath: name },
        conditions: [
            {
                condition: { label: t('label.query_between'), namePath: 'between' },
                queryFieldConfig: { input: { type: 'DateRange' } },
            },
            {
                condition: { label: t('label.query_greater_than'), namePath: 'greaterThan' },
                queryFieldConfig: { input: { type: 'DatePicker' } },
            },
            {
                condition: { label: t('label.query_less_than'), namePath: 'lessThan' },
                queryFieldConfig: { input: { type: 'DatePicker' } },
            },
        ],
    }
};

