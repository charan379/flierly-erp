import { QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder"
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/utils/create-query-builder-field";

const createBrandQueryFields = (translate: (value: string) => string): QueryFieldConfig<Brand>[] => {
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
}

export default createBrandQueryFields;