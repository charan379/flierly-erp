import { QueryBuilderFieldConfig } from '@/modules/core/features/QueryBuilder/QueryBuilder'
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from '@/modules/core/utils/create-query-builder-field'

const createRoleQueryBuilderFields = (translate: (value: string) => string): QueryBuilderFieldConfig<Role>[] => [
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

export default createRoleQueryBuilderFields
