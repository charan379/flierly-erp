import { QueryBuilderFieldConfig } from "@/modules/core/features/QueryBuilder/QueryBuilder";
import { createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/modules/core/utils/create-query-builder-field";

const createBrandQueryFields = (t: (value: string) => string): QueryBuilderFieldConfig<Brand>[] => {
    return [
        // id
        createNumberQueryBuilderField({
            label: t('record.id'),
            name: 'id'
        }),
        // name
        createTextQueryBuilderField({
            label: t('record.name'),
            name: 'name'
        }),
        // createdAt
        createDateQueryBuilderField({
            label: t('record.created_at'),
            name: 'createdAt'
        }),
        // updatedAt
        createDateQueryBuilderField({
            label: t('record.updated_at'),
            name: 'updatedAt'
        }),
        // deletedAt
        createDateQueryBuilderField({
            label: t('record.deleted_at'),
            name: 'deletedAt'
        }),
    ]
}

export default createBrandQueryFields;