import { QueryBuilderFieldConfig } from "@/modules/core/features/QueryBuilder/QueryBuilder";
import { createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/modules/core/utils/create-query-builder-field";

const createBrandQueryFields = (translate: (value: string) => string): QueryBuilderFieldConfig<Brand>[] => {
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
}

export default createBrandQueryFields;