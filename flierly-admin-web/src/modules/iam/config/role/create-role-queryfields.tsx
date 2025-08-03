import { QueryBuilderFieldConfig } from '@/modules/core/features/QueryBuilder/QueryBuilder'
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from '@/modules/core/utils/create-query-builder-field'

const createRoleQueryBuilderFields = (t: (value: string) => string): QueryBuilderFieldConfig<Role>[] => [
  // id
  createNumberQueryBuilderField({
    label: t('record.id'),
    name: 'id'
  }),
  // isActive
  createBooleanQueryBuilderField({
    label: t('record.is_active'),
    name: 'isActive',
    optionLabels: [t('option.active'), t('option.inactive')]
  }),
  // name
  createTextQueryBuilderField({
    label: t('record.name'),
    name: 'name'
  }),
  // code
  createTextQueryBuilderField({
    label: t('record.code'),
    name: 'code'
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

export default createRoleQueryBuilderFields
