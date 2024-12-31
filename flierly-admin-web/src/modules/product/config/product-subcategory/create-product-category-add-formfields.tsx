import { FormFieldConfig } from "@/components/FormField";
import { createAssociatedEntityRowFormField, createBooleanFormField, createCodeFormField, createDescriptionFormField, createNameFormField } from "@/utils/create-dynamic-formfield";

const createProductSubcategoryAddFormFields = (): FormFieldConfig<ProductSubCategory>[] => {

    return [
        // name
        createNameFormField({
            access: {
                permission: /^product-sub-category\.create$/,
                ifNoAccess: 'disable'
            },
            entity: 'product-sub-category',
        }),
        // categoty
        createAssociatedEntityRowFormField<ProductSubCategory, ProductCategory>({
            access: { permission: /^product-sub-category\.create$/, ifNoAccess: 'disable' },
            associatedEntity: "product-category",
            required: true,
            label: "product-category",
            name: "category",
            getFilters: (value) => ({
                name: { $ilike: `%${value}%` },
            }),
            getLabel: (pc) => pc.name,
            getValue: (pc) => pc.id,
        }),
        // code
        createCodeFormField({
            access:
            {
                permission: /^product-sub-category\.create$/,
                ifNoAccess: 'disable'
            },
            entity: 'product-sub-category',
        }),
        // description
        createDescriptionFormField({
            access: {
                permission: /^product-sub-category\.create$/,
                ifNoAccess: 'disable'
            }
        }),
        // isActive
        createBooleanFormField({
            access: {
                permission: /^product-sub-category\.manage$/,
                ifNoAccess: 'disable'
            },
            label: 'active',
            name: 'isActive',
            optionLabels: ['active', 'inactive']
        }),
    ]
};

export default createProductSubcategoryAddFormFields;