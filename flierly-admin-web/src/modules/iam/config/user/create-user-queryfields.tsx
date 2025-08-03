import { QueryBuilderFieldConfig } from "@/modules/core/features/QueryBuilder/QueryBuilder";
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/modules/core/utils/create-query-builder-field";

const createUserQueryBuilderFields = (t: (value: string) => string): QueryBuilderFieldConfig<User>[] => [
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
  // username
  createTextQueryBuilderField({
    label: t('record.username'),
    name: 'username'
  }),
  // email
  createTextQueryBuilderField({
    label: t('record.email'),
    name: 'email'
  }),
  // username
  createTextQueryBuilderField({
    label: t('record.mobile'),
    name: 'mobile'
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
];

export default createUserQueryBuilderFields;