import { FormFieldConfig } from "@/components/FormField";
import { createBooleanFormField, createCodeFormField, createDescriptionFormField, createNameFormField } from "@/utils/create-dynamic-formfield";

const createProductSubcategoryEditFormFields = (): FormFieldConfig<ProductSubCategory>[] => {

    return [
        // name
        createNameFormField({
            access: {
                permission: /^product-sub-category\.update$/,
                ifNoAccess: 'disable'
            },
            entity: 'product-sub-category',
            forUpdateForm: true,
        }),
        // code
        createCodeFormField({
            access: {
                permission: /^product-sub-category\.manage$/,
                ifNoAccess: 'disable'
            },
            entity: 'product-sub-category',
            forUpdateForm: true
        }),
        // description
        createDescriptionFormField({
            access: {
                permission: /^product-sub-category\.update$/,
                ifNoAccess: 'disable'
            }
        }),
        // isActive
        createBooleanFormField({
            access: {
                permission: /^product-sub-category\.manage$/, ifNoAccess: 'disable'
            },
            label: 'active',
            name: 'isActive',
            optionLabels: ['active', 'inactive']
        }),
    ]
};

export default createProductSubcategoryEditFormFields;