import { FormFieldConfig } from "@/components/FormField";
import entityExistenceValidator from "@/utils/entityExistenceValidator";
import { activeFieldOptions } from "@/constants/select-options.constant";

const userCreateFields: FormFieldConfig<User>[] = [
    // name
    {
        name: "username",
        label: "username",
        hasFeedback: true,
        allowClear: true,
        rules: [
            { type: "string", min: 5, max: 30, required: true },
            ({ }) => ({
                validator(_, value) {
                    if (value === undefined) return Promise.resolve();
                    return entityExistenceValidator("user-name-validation-c-1", {
                        entity: "user",
                        filters: { username: { $ilike: value } },
                    });
                },
            }),
        ],
        input: {
            type: "Text",
        },
    },
    // email
    {
        name: "email",
        label: "email",
        hasFeedback: true,
        allowClear: true,
        rules: [
            { type: "email", required: true },
            ({ }) => ({
                validator(_, value) {
                    if (value === undefined) return Promise.resolve();
                    return entityExistenceValidator("user-email-validation-c-1", {
                        entity: "user",
                        filters: { email: value },
                        rejectionMessage: "user_with_same_email_already_exists",
                    });
                },
            }),
        ],
        input: {
            type: "Text",
        },
    },
    // mobile
    {
        name: "mobile",
        label: "mobile",
        hasFeedback: true,
        allowClear: true,
        rules: [
            { type: "string", min: 10, max: 15, required: true },
            ({ }) => ({
                validator(_, value) {
                    if (value === undefined) return Promise.resolve();
                    return entityExistenceValidator("user-mobile-validation-c-1", {
                        entity: "user",
                        filters: { mobile: value },
                        rejectionMessage: "user_with_same_mobile_already_exists",
                    });
                },
            }),
        ],
        input: {
            type: "Text",
        },
    },
    // isActive
    {
        name: "isActive",
        label: "active",
        allowClear: false,
        rules: [{ type: "string" }],
        input: {
            type: "Select",
            options: activeFieldOptions
        },
    }
];

export default userCreateFields;