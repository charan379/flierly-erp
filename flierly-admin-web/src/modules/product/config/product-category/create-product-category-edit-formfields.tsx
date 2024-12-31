import { FormFieldConfig } from "@/components/FormField";
import { createBooleanFormField, createCodeFormField, createDescriptionFormField, createNameFormField } from "@/utils/create-dynamic-formfield";

const createProductCategoryEditFormFields = (): FormFieldConfig<ProductCategory>[] => {

    return [
        // name
        createNameFormField({
            access: { permission: /^product-category\.update$/, ifNoAccess: 'disable' },
            entity: 'brand',
            forUpdateForm: true,
        }),
        // code
        createCodeFormField({ access: { permission: /^product-category\.manage$/, ifNoAccess: 'disable' }, entity: 'product-category', forUpdateForm: true }),
        // description
        createDescriptionFormField({ access: { permission: /^product-category\.update$/, ifNoAccess: 'disable' } }),
        // isActive
        createBooleanFormField({ access: { permission: /^product-category\.manage$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),
    ]
};

export default createProductCategoryEditFormFields;