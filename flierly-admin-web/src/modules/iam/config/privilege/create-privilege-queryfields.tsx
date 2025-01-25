import { accessOptions } from '@/modules/core/constants/select-options.constant'
import { QueryBuilderFieldConfig } from '@/modules/core/features/QueryBuilder/QueryBuilder'
import fetchEntityOptions from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-options'
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createSelectQueryBuilderField, createSelectRemoteOptionsQueryBuilderField, createTextQueryBuilderField } from '@/modules/core/utils/create-query-builder-field'

const createPrivilegeBuilderQueryFields = (t: (value: string) => string): QueryBuilderFieldConfig<Privilege>[] => {
  return [
    // id
    createNumberQueryBuilderField({
      label: t('id'),
      name: 'id'
    }),
    // name
    createTextQueryBuilderField({
      label: t('name'),
      name: 'name'
    }),
    // code
    createTextQueryBuilderField({
      label: t('code'),
      name: 'code'
    }),
    // isActive
    createBooleanQueryBuilderField({
      label: t('status'),
      name: 'isActive',
      optionLabels: [t('active'), t('inactive')]
    }),
    // entity
    createSelectRemoteOptionsQueryBuilderField({
      label: t('entity'),
      name: 'entity',
      asyncOptionsFetcher: fetchEntityOptions
    }),
    // access
    createSelectQueryBuilderField({
      label: t('access'),
      name: 'access',
      options: accessOptions
    }),
    // createdAt
    createDateQueryBuilderField({
      label: t('created_at'),
      name: 'createdAt'
    }),
    // updatedAt
    createDateQueryBuilderField({
      label: t('updated_at'),
      name: 'updatedAt'
    }),
    // deletedAt
    createDateQueryBuilderField({
      label: t('deleted_at'),
      name: 'deletedAt'
    }),
  ]
}

export default createPrivilegeBuilderQueryFields;
