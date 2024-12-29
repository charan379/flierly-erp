import { FormFieldConfig } from '@/components/FormField'
import { booleanSelectFieldOptions } from '@/constants/select-options.constant'

const roleAssociatedEntityQueryFormFields: {
  label: string
  name: keyof Role
  formField: FormFieldConfig<Role>
}[] = [
  {
    label: 'ID',
    name: 'id',
    formField: {
      input: { type: 'Number' },
      rules: [{ required: true, message: '' }],
    },
  },
  { label: 'Name', name: 'name', formField: { input: { type: 'Text' }, rules: [{ required: true, message: '' }] } },
  { label: 'Code', name: 'code', formField: { input: { type: 'Text' }, rules: [{ required: true, message: '' }] } },
  {
    label: 'Status',
    name: 'isActive',
    formField: {
      input: { type: 'Select', options: booleanSelectFieldOptions },
      rules: [{ type: 'string', required: true, message: '' }],
    },
  },
]

export default roleAssociatedEntityQueryFormFields
