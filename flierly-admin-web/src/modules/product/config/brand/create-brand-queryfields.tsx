import { QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder"
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/utils/create-query-builder-field";

const createBrandQueryFields = (translate: (value: string) => string): QueryFieldConfig<Brand>[] => {
    return [
        // id
        createNumberQueryBuilderField(translate('id'), 'id'),
        // name
        createTextQueryBuilderField(translate('name'), 'name'),
        // isActive
        createBooleanQueryBuilderField(translate('status'), 'isActive', [translate('active'), translate('inactive')]),
        // createdAt
        createDateQueryBuilderField(translate('created_at'), 'createdAt'),
        // updatedAt
        createDateQueryBuilderField(translate('updated_at'), 'updatedAt'),
        // deletedAt
        createDateQueryBuilderField(translate('deleted_at'), 'deletedAt'),
    ]
}

export default createBrandQueryFields;