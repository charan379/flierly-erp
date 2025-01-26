import { accessOptions } from '@/modules/core/constants/select-options.constant'
import fetchEntityOptions from '@/modules/core/features/SelectRemoteOptions/utils/fetch-entity-options'
import { AMQueryBuilderFieldConfig, createBooleanAMQueryField, createNumericAMQueryField, createSelectAMQueryField, createSelectRemoteOptionsAMQueryField, createTextAMQueryField } from '@/modules/core/utils/create-assignment-manager-queryfield'

const createPrivilegeAMQueryBuilderFields = (translate: (value: string) => string): AMQueryBuilderFieldConfig<Privilege>[] => {
  return [
    createNumericAMQueryField({
      label: translate('id'),
      name: 'id'
    }),
    createTextAMQueryField({
      label: translate('name'),
      name: 'name'
    }),
    createTextAMQueryField({
      label: translate('code'),
      name: 'code'
    }),
    createSelectRemoteOptionsAMQueryField({
      label: translate('entity'),
      name: 'entity',
      asyncOptionsFetcher: fetchEntityOptions
    }),
    createSelectAMQueryField({
      label: translate('access'),
      name: 'access',
      options: accessOptions
    }),
    createBooleanAMQueryField({
      label: translate('status'),
      name: 'isActive',
      optionLabels: [translate('active'), translate('inactive')]
    }),
  ]
}

export default createPrivilegeAMQueryBuilderFields
