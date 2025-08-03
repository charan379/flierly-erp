import { QueryBuilderFieldConfig } from "@/modules/core/features/QueryBuilder/QueryBuilder";
import { createAssociatedEntityRowQueryBuilderFiled, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/modules/core/utils/create-query-builder-field"

const createProductSubcategoryQueryFields = (translate: (value: string) => string): QueryBuilderFieldConfig<ProductSubCategory>[] => {
    return [
        // id
        createNumberQueryBuilderField({
            label: translate('record.id'),
            name: 'id'
        }),
        // name
        createTextQueryBuilderField({
            label: translate('record.name'),
            name: 'name'
        }),
        // category
        createAssociatedEntityRowQueryBuilderFiled<ProductSubCategory, ProductCategory>({
            label: translate("product.category"),
            name: "categoryId",
            associatedEntity: "product-category",
            getFilters: (value) => ({
                name: { $iContains: `%${value}%` },
            }),
            getLabel: (pc) => pc.name,
            getValue: (pc) => pc.id,
        }),
        // createdAt
        createDateQueryBuilderField({
            label: translate('record.created_at'),
            name: 'createdAt'
        }),
        // updatedAt
        createDateQueryBuilderField({
            label: translate('record.updated_at'),
            name: 'updatedAt'
        }),
        // deletedAt
        createDateQueryBuilderField({
            label: translate('record.deleted_at'),
            name: 'deletedAt'
        }),
    ]
};

export default createProductSubcategoryQueryFields;