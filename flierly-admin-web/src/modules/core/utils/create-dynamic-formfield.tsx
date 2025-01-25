import { QueryFieldConfig } from "@/modules/core/components/QueryField";
import entityExistenceValidator from "./entity-existence.validator";
import fetchEntityOptions from "@/features/SelectRemoteOptions/utils/fetch-entity-options";
import regexConstants from "@/modules/core/constants/validations.regex";
import fetchEntityRecordsAsOptions from "@/features/SelectRemoteOptions/utils/fetch-entity-rows-as-options";
import { SelectRemoteOptionsProps } from "@/features/SelectRemoteOptions/SelectRemoteOptions";

// id
export const createIdFormField = <T extends Record<'id', any>>(params: { dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'], name?: keyof T, label?: string, }): QueryFieldConfig<T> => {
    const { label, name, dependencies, onDependencyChange } = params;
    return {
        name: name ?? 'id',
        label: label ?? 'id',
        hidden: false,
        disabled: true,
        hasFeedback: false,
        allowClear: false,
        dependencies,
        onDependencyChange,
        input: {
            type: 'Text',
        },
    };
};

// name
export const createNameFormField = <T extends Record<'name', any>>(params: { name?: keyof T, label?: string, dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'], access?: QueryFieldConfig['access'], entity: string, forUpdateForm?: boolean }): QueryFieldConfig<T> => {
    const { access, entity, dependencies, onDependencyChange, forUpdateForm, label, name } = params;
    return {
        name: name ?? 'name',
        label: label ?? 'name',
        hasFeedback: true,
        allowClear: false,
        access,
        dependencies,
        onDependencyChange,
        rules: [
            { type: 'string', min: 5, max: 30, required: true },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || value?.length < 5 || value?.length > 30) return Promise.resolve()
                    return entityExistenceValidator(`${entity}-name-existence-validation`, {
                        entity,
                        filters: {
                            ...(forUpdateForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                            [name ?? "name"]: { $ilike: value },
                        },
                        rejectionMessage: 'name_already_exists',
                    })
                },
            }),
        ],
        input: {
            type: 'Text',
        },
    };
};

// number field
export const createNumberFormField = <T extends Record<'hsn', any>>(params: { name?: keyof T, label?: string, dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'], access?: QueryFieldConfig['access'], entity: string, forUpdateForm?: boolean }): QueryFieldConfig<T> => {
    const { access, label, dependencies, onDependencyChange, name } = params;
    return {
        name: name ?? 'hsn',
        label: label ?? 'hsn',
        hasFeedback: true,
        allowClear: false,
        access,
        dependencies,
        onDependencyChange,
        rules: [{ type: 'number', min: 1, max: 100000, required: true }],
        input: {
            type: 'Number',
        },
    };
};

// number field
export const createDecimalFormField = <T extends Record<'price', any>>(params: { dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'], name?: keyof T, label?: string, access?: QueryFieldConfig['access'], entity: string, forUpdateForm?: boolean }): QueryFieldConfig<T> => {
    const { access, label, dependencies, onDependencyChange, name } = params;
    return {
        name: name ?? 'price',
        label: label ?? 'price',
        hasFeedback: true,
        allowClear: false,
        access,
        dependencies,
        onDependencyChange,
        rules: [{ type: 'float', required: true }],
        input: {
            type: 'Decimal',
            max: 100000,
            min: 0,
            precision: 2,
            step: 0.01,

        },
    };
};

// entity
export const createEntityFormField = <T extends Record<"entity", any>>(params: { dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'], name?: keyof T, label?: string, access?: QueryFieldConfig['access'] }): QueryFieldConfig<T> => {

    const { access, label, dependencies, onDependencyChange, name } = params;
    return {
        name: name ?? 'entity',
        label: label ?? 'entity',
        allowClear: false,
        hasFeedback: false,
        access,
        dependencies,
        onDependencyChange,
        rules: [{ required: true }],
        input: {
            type: 'SelectRemoteOptions',
            asyncOptionsFetcher: fetchEntityOptions,
            debounceTimeout: 300,
        },
    };
};

// associated entity row
export const createAssociatedEntityRowFormField = <T extends Record<string, any>, AE>(params: { access?: QueryFieldConfig['access'], name: keyof T, label: string, associatedEntity: string, required?: boolean, getLabel: (row: AE) => string, getValue: (row: AE) => any, getFilters: (value: string) => Partial<Record<keyof AE, any>>, optionCreatorConfig?: SelectRemoteOptionsProps['optionCreatorConfig'], disabled?: boolean, dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'] }): QueryFieldConfig<T> => {

    const { access, disabled, dependencies, onDependencyChange, associatedEntity, optionCreatorConfig, label, name, required, getLabel, getFilters, getValue } = params;
    return {
        name,
        label,
        allowClear: true,
        hasFeedback: false,
        access,
        disabled: disabled,
        rules: [{ required }],
        dependencies,
        onDependencyChange,
        input: {
            type: 'SelectRemoteOptions',
            asyncOptionsFetcher: (value) => fetchEntityRecordsAsOptions<AE>(
                associatedEntity,
                getFilters(value),
                10,
                (rows) => rows.map((row) => ({ label: getLabel(row), value: getValue(row) })),
            ),
            debounceTimeout: 300,
            optionCreatorConfig,
        },
    };
}

// boolean field
export const createBooleanFormField = <T extends Record<string, any>>(params: { access?: QueryFieldConfig['access'], optionLabels: Array<string>, name: keyof T, label: string, dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'] }): QueryFieldConfig<T> => {
    const { access, optionLabels, dependencies, onDependencyChange, label, name } = params;
    return {
        name,
        label,
        access,
        allowClear: false,
        rules: [],
        dependencies,
        onDependencyChange,
        input: {
            type: 'Select',
            options: [{ label: optionLabels[0], value: 'true' }, { label: optionLabels[1], value: 'false' }],
        },
        convertValue: (value) => {
            if (value === true) {
                return 'true'
            } else if (value === false) {
                return 'false'
            } else {
                return value
            }
        },
    };
};

// code
export const createCodeFormField = <T extends Record<'code', any>>(params: { name?: keyof T, label?: string, access?: QueryFieldConfig['access'], entity: string, forUpdateForm?: boolean, dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'] }): QueryFieldConfig<T> => {

    const { access, entity, forUpdateForm, dependencies, onDependencyChange, label, name } = params;

    return {
        name: name ?? 'code',
        label: label ?? 'code',
        hasFeedback: true,
        allowClear: false,
        access,
        dependencies,
        onDependencyChange,
        rules: [
            { type: 'string', pattern: regexConstants.code, message: 'invalid_code' },
            { min: 5, max: 25, required: true },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || !regexConstants.code.test(value) || value?.length < 5 || value?.length > 25) return Promise.resolve()
                    return entityExistenceValidator(`${entity}-code-validation`, {
                        entity,
                        filters: {
                            ...(forUpdateForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {})
                            , [name ?? "code"]: value
                        },
                        rejectionMessage: 'code_already_exists',
                    })
                },
            }),
        ],
        input: {
            type: 'Text',
        },
    };
};

// code
export const createSkuFormField = <T extends Record<'sku', any>>(params: { name?: keyof T, label?: string, access?: QueryFieldConfig['access'], entity: string, forUpdateForm?: boolean, dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'] }): QueryFieldConfig<T> => {

    const { access, entity, forUpdateForm, label, name, dependencies, onDependencyChange } = params;

    return {
        name: name ?? 'sku',
        label: label ?? 'sku',
        hasFeedback: true,
        allowClear: false,
        access,
        dependencies,
        onDependencyChange,
        rules: [
            { type: 'string', pattern: regexConstants.sku, message: 'invalid_sku' },
            { min: 3, max: 25, required: true },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || !regexConstants.code.test(value) || value?.length < 3 || value?.length > 25) return Promise.resolve()
                    return entityExistenceValidator(`${entity}-sku-validation`, {
                        entity,
                        filters: {
                            ...(forUpdateForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {})
                            , [name ?? "sku"]: value
                        },
                        rejectionMessage: 'sku_already_exists',
                    })
                },
            }),
        ],
        input: {
            type: 'Text',
        },
    };
};

// description
export const createDescriptionFormField = <T extends Record<'description', any>>(params: { name?: keyof T, label?: string, access?: QueryFieldConfig['access'], dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'] }): QueryFieldConfig<T> => {

    const { access, label, name, dependencies, onDependencyChange } = params;

    return {
        name: name ?? 'description',
        label: label ?? 'description',
        hasFeedback: true,
        allowClear: true,
        access,
        dependencies,
        onDependencyChange,
        rules: [{ type: 'string', min: 5, max: 100, required: true }],
        input: {
            type: 'TextArea',
        },
    };
};

export const createEmailFormField = <T extends Record<'email', any>>(params: { name?: keyof T, label?: string, access?: QueryFieldConfig['access'], entity: string, forUpdateForm?: boolean, dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'] }): QueryFieldConfig<T> => {

    const { access, entity, dependencies, onDependencyChange, forUpdateForm, label, name } = params;

    return {
        name: name ?? 'email',
        label: label ?? 'email',
        hasFeedback: true,
        allowClear: false,
        access,
        dependencies,
        onDependencyChange,
        rules: [
            { type: 'email', required: true },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || !regexConstants.email.test(value)) return Promise.resolve()
                    return entityExistenceValidator(`${entity}-email-validation`, {
                        entity,
                        filters: {
                            ...(forUpdateForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                            [name ?? "email"]: value
                        },
                        rejectionMessage: 'email_already_exists',
                    })
                },
            }),
        ],
        input: {
            type: 'Text',
        },
    };
};

export const createMobileFormField = <T extends Record<'mobile', any>>(params: { name?: keyof T, label?: string, access?: QueryFieldConfig['access'], entity: string, forUpdateForm?: boolean, dependencies?: QueryFieldConfig<T>['dependencies'], onDependencyChange?: QueryFieldConfig<T>['onDependencyChange'] }): QueryFieldConfig<T> => {

    const { access, entity, dependencies, onDependencyChange, forUpdateForm, label, name } = params;

    return {
        name: name ?? 'mobile',
        label: label ?? 'mobile',
        hasFeedback: true,
        allowClear: false,
        access,
        dependencies,
        onDependencyChange,
        rules: [
            { type: 'string', min: 10, max: 15, required: true },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || value?.length < 10 || value?.length > 15 || !regexConstants.mobile.test(value)) return Promise.resolve()
                    return entityExistenceValidator(`${entity}-mobile-validation`, {
                        entity,
                        filters: {
                            ...(forUpdateForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                            [name ?? "mobile"]: value
                        },
                        rejectionMessage: 'mobile_already_exists',
                    })
                },
            }),
        ],
        input: {
            type: 'Text',
        },
    };
};