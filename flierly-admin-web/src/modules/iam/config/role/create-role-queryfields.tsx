import { QueryFieldConfig } from '@/features/QueryBuilder/QueryBuilder'
import { createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from '@/utils/create-query-builder-field'

const createRoleQueryFields = (translate: (value: string) => string): QueryFieldConfig<Role>[] => [
  // id
  createNumberQueryBuilderField(translate('id'), 'id'),
  // name
  createTextQueryBuilderField(translate('name'), 'name'),
  // code
  createTextQueryBuilderField(translate('code'), 'code'),
  // isActive
  createTextQueryBuilderField(translate('status'), 'isActive'),
  // createdAt
  createDateQueryBuilderField(translate('created_at'), 'createdAt'),
  // updatedAt
  createDateQueryBuilderField(translate('updated_at'), 'updatedAt'),
  // deletedAt
  createDateQueryBuilderField(translate('deleted_at'), 'deletedAt'),
]

export default createRoleQueryFields
