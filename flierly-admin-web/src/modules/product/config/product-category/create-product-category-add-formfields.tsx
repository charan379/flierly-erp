import { FormFieldConfig } from "@/components/FormField";
import { createBooleanFormField, createCodeFormField, createDescriptionFormField, createNameFormField } from "@/utils/create-dynamic-formfield";

const createProductCategoryAddFormFields = (): FormFieldConfig<ProductCategory>[] => {

    return [
        // name
        createNameFormField({
            access: { permission: /^product-category\.create$/, ifNoAccess: 'disable' },
            entity: 'brand',
        }),
        // code
        createCodeFormField({ access: { permission: /^product-category\.create$/, ifNoAccess: 'disable' }, entity: 'role', }),
        // description
        createDescriptionFormField({ access: { permission: /^product-category\.create$/, ifNoAccess: 'disable' } }),
        // isActive
        createBooleanFormField({ access: { permission: /^product-category\.manage$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),

    ]
};

export default createProductCategoryAddFormFields;