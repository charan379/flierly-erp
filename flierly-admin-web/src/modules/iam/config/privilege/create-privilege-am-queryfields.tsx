import { FormFieldConfig } from '@/components/FormField'
import { accessOptions } from '@/constants/select-options.constant'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options'
import { createBooleanAMQueryField, createNumericAMQueryField, createSelectAMQueryField, createSelectRemoteOptionsAMQueryField, createTextAMQueryField } from '@/utils/create-assignment-manager-queryfield'

const createPrivilegeAMQueryFields = (translate: (value: string) => string): {
  label: string
  name: keyof Privilege
  formField: FormFieldConfig<Privilege>
}[] => {
  return [
    createNumericAMQueryField(translate('id'), 'id'),
    createTextAMQueryField(translate('name'), 'name'),
    createTextAMQueryField(translate('code'), 'code'),
    createSelectRemoteOptionsAMQueryField(translate('entity'), 'entity', fetchEntityOptions),
    createSelectAMQueryField(translate('access'), 'access', accessOptions),
    createBooleanAMQueryField(translate('status'), 'isActive', [translate('active'), translate('inactive')]),
  ]
}

export default createPrivilegeAMQueryFields
