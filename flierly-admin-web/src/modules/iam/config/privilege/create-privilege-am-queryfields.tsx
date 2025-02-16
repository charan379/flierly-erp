import { accessOptions } from '@/modules/iam/constants/access-type-options.constant'
import fetchEntityOptions from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-options'
import { AMQueryBuilderFieldConfig, createBooleanAMQueryField, createNumericAMQueryField, createSelectAMQueryField, createSelectRemoteOptionsAMQueryField, createTextAMQueryField } from '@/modules/core/utils/create-assignment-manager-queryfield'

const createPrivilegeAMQueryBuilderFields = (t: (value: string) => string): AMQueryBuilderFieldConfig<Privilege>[] => {
  return [
    // id
    createNumericAMQueryField({
      label: t('record.id'),
      name: 'id'
    }),
    // isActive
    createBooleanAMQueryField({
      label: t('record.is_active'),
      name: 'isActive',
      optionLabels: [t('option.active'), t('option.active')]
    }),
    // name
    createTextAMQueryField({
      label: t('record.name'),
      name: 'name',
    }),
    // access
    createSelectAMQueryField({
      label: t('privilege.access'),
      name: 'access',
      options: accessOptions
    }),
    // entity
    createSelectRemoteOptionsAMQueryField({
      label: t('privilege.entity'),
      name: 'entity',
      rules: [{ type: 'regexp', message: 'sdsd' }],
      asyncOptionsFetcher: fetchEntityOptions
    }),
    // code
    createTextAMQueryField({
      label: t('record.code'),
      name: 'code'
    }),
  ]
}

export default createPrivilegeAMQueryBuilderFields
