import { accessOptions } from '@/constants/select-options.constant'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options'
import { AMQueryFieldConfig, createBooleanAMQueryField, createNumericAMQueryField, createSelectAMQueryField, createSelectRemoteOptionsAMQueryField, createTextAMQueryField } from '@/utils/create-assignment-manager-queryfield'

const createPrivilegeAMQueryFields = (translate: (value: string) => string): AMQueryFieldConfig<Privilege>[] => {
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

export default createPrivilegeAMQueryFields
