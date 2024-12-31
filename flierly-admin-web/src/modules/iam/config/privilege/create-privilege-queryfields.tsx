import { QueryFieldConfig } from '@/features/QueryBuilder/QueryBuilder'
import { accessOptions } from '@/constants/select-options.constant'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options'
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createSelectQueryBuilderField, createSelectRemoteOptionsQueryBuilderField, createTextQueryBuilderField } from '@/utils/create-query-builder-field'

const createPrivilegeQueryFields = (translate: (value: string) => string): QueryFieldConfig<Privilege>[] => {
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
    // entity
    createSelectRemoteOptionsQueryBuilderField({
      label: translate('entity'),
      name: 'entity',
      asyncOptionsFetcher: fetchEntityOptions
    }),
    // access
    createSelectQueryBuilderField({
      label: translate('access'),
      name: 'access',
      options: accessOptions
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

export default createPrivilegeQueryFields
