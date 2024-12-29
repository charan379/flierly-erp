import { QueryFieldConfig } from '@/features/QueryBuilder/QueryBuilder'
import { accessOptions } from '@/constants/select-options.constant'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options'
import { createBooleanQueryBuilderField, createDateQueryBuilderField, createNumberQueryBuilderField, createSelectQueryBuilderField, createSelectRemoteOptionsQueryBuilderField, createTextQueryBuilderField } from '@/utils/create-query-builder-field'

const createPrivilegeQueryFields = (translate: (value: string) => string): QueryFieldConfig<Privilege>[] => {
  return [
    // id
    createNumberQueryBuilderField(translate('id'), 'id'),
    // name
    createTextQueryBuilderField(translate('name'), 'name'),
    // entity
    createSelectRemoteOptionsQueryBuilderField(translate('entity'), 'entity', fetchEntityOptions),
    // access
    createSelectQueryBuilderField(translate('access'), 'access', accessOptions),
    // isActive
    createBooleanQueryBuilderField(translate('status'), 'isActive', [translate('active'), translate('inactive')]),
    // code
    createTextQueryBuilderField(translate('code'), 'code'),
    // createdAt
    createDateQueryBuilderField(translate('created_at'), 'createdAt'),
    // updatedAt
    createDateQueryBuilderField(translate('updated_at'), 'updatedAt'),
    // deletedAt
    createDateQueryBuilderField(translate('deleted_at'), 'deletedAt'),
  ]
}

export default createPrivilegeQueryFields
