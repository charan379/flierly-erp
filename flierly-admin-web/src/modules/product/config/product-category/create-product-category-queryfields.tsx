import { QueryBuilderFieldConfig } from "@/modules/core/features/QueryBuilder/QueryBuilder";
import { createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/modules/core/utils/create-query-builder-field"


const createProductCategoryQueryFields = (translate: (value: string) => string): QueryBuilderFieldConfig<ProductCategory>[] => {
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

export default createProductCategoryQueryFields;