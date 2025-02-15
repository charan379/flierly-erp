import { accessOptions } from '@/modules/core/constants/select-options.constant'
import { QueryBuilderFieldConfig } from '@/modules/core/features/QueryBuilder/QueryBuilder'
import fetchEntityOptions from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-options'
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createSelectQueryBuilderField, createSelectRemoteOptionsQueryBuilderField, createTextQueryBuilderField } from '@/modules/core/utils/create-query-builder-field'

const createPrivilegeBuilderQueryFields = (t: (value: string) => string): QueryBuilderFieldConfig<Privilege>[] => {
  return [
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
    // access
    createSelectQueryBuilderField({
      label: t('privilege.access'),
      name: 'access',
      options: accessOptions
    }),
    // entity
    createSelectRemoteOptionsQueryBuilderField({
      label: t('privilege.entity'),
      name: 'entity',
      asyncOptionsFetcher: fetchEntityOptions
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
}

export default createPrivilegeBuilderQueryFields;
