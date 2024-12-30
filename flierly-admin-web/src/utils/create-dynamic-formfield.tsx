import { FormFieldConfig } from "@/components/FormField";
import entityExistenceValidator from "./entity-existence.validator";
import fetchEntityOptions from "@/features/SelectRemoteOptions/utils/fetch-entity-options";
import regexConstants from "@/constants/regex.constants";

// id
export const createIdFormField = <T extends Record<'id', any>>(): FormFieldConfig<T> => {
    return {
        name: 'id',
        label: 'id',
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
export const createNameFormField = <T extends Record<'name', any>>(args: { access?: FormFieldConfig['access'], entity: string, forUpdateForm?: boolean }): FormFieldConfig<T> => {
    const { access, entity, forUpdateForm } = args;
    return {
        name: 'name',
        label: 'name',
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
export const createEntityFormField = <T extends Record<"entity", any>>(args: { access?: FormFieldConfig['access'] }): FormFieldConfig<T> => {

    const { access } = args;
    return {
        name: 'entity',
        label: 'entity',
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

// boolean field
export const createBooleanFormField = <T extends Record<string, any>>(args: { access?: FormFieldConfig['access'], optionLabels: Array<string>, name: keyof T, label: string }): FormFieldConfig<T> => {
    const { access, optionLabels, label, name } = args;
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
export const createCodeFormField = <T extends Record<'code', any>>(args: { access?: FormFieldConfig['access'], entity: string, forUpdateForm?: boolean }): FormFieldConfig<T> => {

    const { access, entity, forUpdateForm } = args;

    return {
        name: 'code',
        label: 'code',
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
export const createDescriptionFormField = <T extends Record<'description', any>>(args: { access?: FormFieldConfig['access'] }): FormFieldConfig<T> => {

    const { access } = args;

    return {
        name: 'description',
        label: 'description',
        hasFeedback: true,
        allowClear: true,
        access,
        rules: [{ type: 'string', min: 5, max: 100, required: true }],
        input: {
            type: 'TextArea',
        },
    };
}