import { QueryFieldConfig } from "@/features/QueryBuilder/QueryBuilder"
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/utils/create-query-builder-field"

const createProductCategoryQueryFields = (translate: (value: string) => string): QueryFieldConfig<ProductCategory>[] => {
    return [
        // id
        createNumberQueryBuilderField(translate('id'), 'id'),
        // name
        createTextQueryBuilderField(translate('name'), 'name'),
        // code
        createTextQueryBuilderField(translate('code'), 'code'),
        // isActive
        createBooleanQueryBuilderField(translate('status'), 'isActive', [translate('active'), translate('inactive')]),
        // createdAt
        createDateQueryBuilderField(translate('created_at'), 'createdAt'),
        // updatedAt
        createDateQueryBuilderField(translate('updated_at'), 'updatedAt'),
        // deletedAt
        createDateQueryBuilderField(translate('deleted_at'), 'deletedAt'),
    ]
};

export default createProductCategoryQueryFields;