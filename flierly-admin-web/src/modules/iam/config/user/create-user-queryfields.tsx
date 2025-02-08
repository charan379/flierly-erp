import { QueryBuilderFieldConfig } from "@/modules/core/features/QueryBuilder/QueryBuilder";
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createTextQueryBuilderField } from "@/modules/core/utils/create-query-builder-field";

const createUserQueryBuilderFields = (translate: (value: string) => string): QueryBuilderFieldConfig<User>[] => [
  // id
  createNumberQueryBuilderField({
    label: translate('id'),
    name: 'id'
  }),
  // isActive
  createBooleanQueryBuilderField({
    label: translate('status'),
    name: 'isActive',
    optionLabels: [translate('active'), translate('inactive')]
  }),
  // username
  createTextQueryBuilderField({
    label: translate('username'),
    name: 'username'
  }),
  // email
  createTextQueryBuilderField({
    label: translate('email'),
    name: 'email'
  }),
  // username
  createTextQueryBuilderField({
    label: translate('mobile'),
    name: 'mobile'
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
];

export default createUserQueryBuilderFields;