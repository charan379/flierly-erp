import { FormFieldConfig } from '@/components/FormField'
import { accessOptions } from '@/constants/select-options.constant'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options'
import { createBooleanAMQueryField, createNumericAMQueryField, createSelectAMQueryField, createSelectRemoteOptionsAMQueryField, createTextAMQueryField } from '@/utils/create-assignment-manager-query-field'

const createPrivilegeAMQueryFields = (translate: (value: string) => string): {
  label: string
  name: keyof Privilege
  formField: FormFieldConfig<Privilege>
}[] => {
  return [
    createNumericAMQueryField<Privilege>(translate('id'), 'id'),
    createTextAMQueryField<Privilege>(translate('name'), 'name'),
    createTextAMQueryField<Privilege>(translate('code'), 'code'),
    createSelectRemoteOptionsAMQueryField<Privilege>(translate('entity'), 'entity', fetchEntityOptions),
    createSelectAMQueryField<Privilege>(translate('access'), 'access', accessOptions),
    createBooleanAMQueryField<Privilege>(translate('status'), 'isActive', [translate('active'), translate('inactive')]),
  ]
}

export default createPrivilegeAMQueryFields
