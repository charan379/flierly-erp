import { FormFieldConfig } from "@/components/FormField";
import entityExistenceValidator from "./entity-existence.validator";
import fetchEntityOptions from "@/features/SelectRemoteOptions/utils/fetch-entity-options";
import regexConstants from "@/constants/regex.constants";
import fetchEntityRowsAsOptions from "@/features/SelectRemoteOptions/utils/fetch-entity-rows-as-options";
import { SelectRemoteOptionsProps } from "@/features/SelectRemoteOptions/SelectRemoteOptions";

// id
export const createIdFormField = <T extends Record<'id', any>>(params: { name?: keyof T, label?: string, }): FormFieldConfig<T> => {
    const { label, name } = params;
    return {
        name: name ?? 'id',
        label: label ?? 'id',
        hidden: false,
        disabled: true,
        hasFeedback: false,
        allowClear: false,
        input: {
            type: 'Text',
        },
    };
};

// name
export const createNameFormField = <T extends Record<'name', any>>(params: { name?: keyof T, label?: string, access?: FormFieldConfig['access'], entity: string, forUpdateForm?: boolean }): FormFieldConfig<T> => {
    const { access, entity, forUpdateForm, label, name } = params;
    return {
        name: name ?? 'name',
        label: label ?? 'name',
        hasFeedback: true,
        allowClear: false,
        access,
        rules: [
            { type: 'string', min: 5, max: 30, required: true },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || value?.length < 5 || value?.length > 30) return Promise.resolve()
                    return entityExistenceValidator(`${entity}-name-existence-validation`, {
                        entity,
                        filters: {
                            ...(forUpdateForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                            name: { $ilike: value },
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

// entity
export const createEntityFormField = <T extends Record<"entity", any>>(params: { name?: keyof T, label?: string, access?: FormFieldConfig['access'] }): FormFieldConfig<T> => {

    const { access, label, name } = params;
    return {
        name: name ?? 'entity',
        label: label ?? 'entity',
        allowClear: false,
        hasFeedback: false,
        access,
        rules: [{ required: true }],
        input: {
            type: 'SelectRemoteOptions',
            asyncOptionsFetcher: fetchEntityOptions,
            debounceTimeout: 300,
        },
    };
};

// associated entity row
export const createAssociatedEntityRowFormField = <T, AE>(params: { access?: FormFieldConfig['access'], name: keyof T, label: string, associatedEntity: string, required?: boolean, getLabel: (row: AE) => string, getValue: (row: AE) => any, getFilters: (value: string) => Partial<Record<keyof AE, any>>, optionCreatorConfig?: SelectRemoteOptionsProps['optionCreatorConfig'] }): FormFieldConfig<T> => {

    const { access, associatedEntity, optionCreatorConfig, label, name, required, getLabel, getFilters, getValue } = params;
    return {
        name,
        label,
        allowClear: false,
        hasFeedback: false,
        access,
        rules: [{ required }],
        input: {
            type: 'SelectRemoteOptions',
            asyncOptionsFetcher: (value) => fetchEntityRowsAsOptions<AE>(
                associatedEntity,
                getFilters(value),
                10,
                (rows) => rows.map((row) => ({ label: getLabel(row), value: getValue(row) }))
            ),
            debounceTimeout: 300,
            optionCreatorConfig,
        },
    };
}

// boolean field
export const createBooleanFormField = <T extends Record<string, any>>(params: { access?: FormFieldConfig['access'], optionLabels: Array<string>, name: keyof T, label: string }): FormFieldConfig<T> => {
    const { access, optionLabels, label, name } = params;
    return {
        name,
        label,
        access,
        allowClear: false,
        rules: [],
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
export const createCodeFormField = <T extends Record<'code', any>>(params: { name?: keyof T, label?: string, access?: FormFieldConfig['access'], entity: string, forUpdateForm?: boolean }): FormFieldConfig<T> => {

    const { access, entity, forUpdateForm, label, name } = params;

    return {
        name: name ?? 'code',
        label: label ?? 'code',
        hasFeedback: true,
        allowClear: false,
        access,
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
                            , code: value
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

// description
export const createDescriptionFormField = <T extends Record<'description', any>>(params: { name?: keyof T, label?: string, access?: FormFieldConfig['access'] }): FormFieldConfig<T> => {

    const { access, label, name } = params;

    return {
        name: name ?? 'description',
        label: label ?? 'description',
        hasFeedback: true,
        allowClear: true,
        access,
        rules: [{ type: 'string', min: 5, max: 100, required: true }],
        input: {
            type: 'TextArea',
        },
    };
};

export const createEmailFormField = <T extends Record<'email', any>>(params: { name?: keyof T, label?: string, access?: FormFieldConfig['access'], entity: string, forUpdateForm?: boolean }): FormFieldConfig<T> => {

    const { access, entity, forUpdateForm, label, name } = params;

    return {
        name: name ?? 'email',
        label: label ?? 'email',
        hasFeedback: true,
        allowClear: false,
        access,
        rules: [
            { type: 'email', required: true },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || !regexConstants.email.test(value)) return Promise.resolve()
                    return entityExistenceValidator(`${entity}-email-validation`, {
                        entity,
                        filters: {
                            ...(forUpdateForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                            email: value
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

export const createMobileFormField = <T extends Record<'mobile', any>>(params: { name?: keyof T, label?: string, access?: FormFieldConfig['access'], entity: string, forUpdateForm?: boolean }): FormFieldConfig<T> => {

    const { access, entity, forUpdateForm, label, name } = params;

    return {
        name: name ?? 'mobile',
        label: label ?? 'mobile',
        hasFeedback: true,
        allowClear: false,
        access,
        rules: [
            { type: 'string', min: 10, max: 15, required: true },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || value?.length < 10 || value?.length > 15 || !regexConstants.mobile.test(value)) return Promise.resolve()
                    return entityExistenceValidator(`${entity}-mobile-validation`, {
                        entity,
                        filters: {
                            ...(forUpdateForm && getFieldValue('id') ? { id: { $notEqualTo: getFieldValue('id') } } : {}),
                            mobile: value
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