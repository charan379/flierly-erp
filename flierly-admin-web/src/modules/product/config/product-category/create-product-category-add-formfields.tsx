import { FormFieldConfig } from "@/components/FormField";
import { createBooleanFormField, createCodeFormField, createDescriptionFormField, createNameFormField } from "@/utils/create-dynamic-formfield";

const createProductCategoryAddFormFields = (): FormFieldConfig<ProductCategory>[] => {

    return [
        // name
        createNameFormField({
            access: { permission: /^product-category\.create$/, ifNoAccess: 'disable' },
            entity: 'product-category',
        }),
        // code
        createCodeFormField({ access: { permission: /^product-category\.create$/, ifNoAccess: 'disable' }, entity: 'product-category', }),
        // description
        createDescriptionFormField({ access: { permission: /^product-category\.create$/, ifNoAccess: 'disable' } }),
        // isActive
        createBooleanFormField({ access: { permission: /^product-category\.manage$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),

    ]
};

export default createProductCategoryAddFormFields;