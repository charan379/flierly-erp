import { QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder"
import { createAssociatedEntityRowQueryBuilderFiled, createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/utils/create-query-builder-field"

const createProductSubcategoryQueryFields = (translate: (value: string) => string): QueryFieldConfig<ProductSubCategory>[] => {
    return [
        // id
        createNumberQueryBuilderField({
            label: translate('id'),
            name: 'id'
        }),
        // name
        createTextQueryBuilderField({
            label: translate('name'),
            name: 'name'
        }),
        // code
        createTextQueryBuilderField({
            label: translate('code'),
            name: 'code'
        }),
        // category
        createAssociatedEntityRowQueryBuilderFiled<ProductSubCategory, ProductCategory>({
            label: translate("category"),
            name: "category",
            associatedEntity: "product-category",
            getFilters: (value) => ({
                name: { $ilike: `%${value}%` },
            }),
            getLabel: (pc) => pc.name,
            getValue: (pc) => pc.id,
        }),
        // isActive
        createBooleanQueryBuilderField({
            label: translate('status'),
            name: 'isActive',
            optionLabels: [translate('active'), translate('inactive')]
        }),
        // createdAt
        createDateQueryBuilderField({
            label: translate('created_at'),
            name: 'createdAt'
        }),
        // updatedAt
        createDateQueryBuilderField({
            label: translate('updated_at'),
            name: 'updatedAt'
        }),
        // deletedAt
        createDateQueryBuilderField({
            label: translate('deleted_at'),
            name: 'deletedAt'
        }),
    ]
};

export default createProductSubcategoryQueryFields;