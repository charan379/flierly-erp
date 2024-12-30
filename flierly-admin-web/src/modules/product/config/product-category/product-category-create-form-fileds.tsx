import { FormFieldConfig } from "@/components/FormField";
import { statusFieldOptions } from "@/constants/select-options.constant";
import entityExistenceValidator from "@/utils/entity-existence.validator";

const productCategoryCreateFormFields: FormFieldConfig<ProductCategory>[] = [
    // name
    {
        name: 'name',
        label: 'name',
        hasFeedback: true,
        allowClear: true,
        rules: [{ type: 'string', min: 3, max: 50, required: true },
        () => ({
            validator(_, value) {
                if (!value || value.length < 5 || value.length > 50) return Promise.resolve()
                return entityExistenceValidator('p-c-name-c-c-1', {
                    entity: 'brand',
                    filters: { name: { $ilike: value } },
                })
            },
        }),
        ],
        input: {
            type: 'Text',
        },
    },
    // isActive
    {
        name: 'isActive',
        label: 'active',
        allowClear: false,
        rules: [{ type: 'string' }],
        input: {
            type: 'Select',
            options: statusFieldOptions,
        },
    },
    // description
    {
        name: 'description',
        label: 'description',
        hasFeedback: true,
        allowClear: true,
        rules: [{ type: 'string', min: 5, max: 100, required: false }],
        input: {
            type: 'TextArea',
        },
    },
];

export default productCategoryCreateFormFields