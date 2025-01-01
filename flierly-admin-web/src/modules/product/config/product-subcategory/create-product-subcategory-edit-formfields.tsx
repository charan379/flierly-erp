import { FormFieldConfig } from "@/components/FormField";
import { createAssociatedEntityRowFormField, createBooleanFormField, createCodeFormField, createDescriptionFormField, createNameFormField } from "@/utils/create-dynamic-formfield";
import createProductCategoryAddFormFields from "../product-category/create-product-category-add-formfields";

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
        // 
        // categoty
        createAssociatedEntityRowFormField<ProductSubCategory, ProductCategory>({
            access: { permission: /^product-sub-category\.manage$/, ifNoAccess: 'disable' },
            associatedEntity: "product-category",
            required: true,
            label: "product-category",
            name: "category",
            getFilters: (value) => ({
                name: { $ilike: `%${value}%` },
            }),
            getLabel: (pc) => pc.name,
            getValue: (pc) => pc.id,
            optionCreatorConfig: {
                permissionCode: /^product-category\.create$/,
                entity: "product-category",
                formFields: createProductCategoryAddFormFields() as FormFieldConfig[],
                title: "Add Product Category",
                onCreateSuccessSetValue: (entity) => entity.id,
                onCreateSuccessSearchKeyword: (entity) => entity.name,
            }
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