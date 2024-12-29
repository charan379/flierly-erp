import { FormFieldConfig } from '@/components/FormField'
import { booleanSelectFieldOptions } from '@/constants/select-options.constant'

const brandUpdateFormFields: FormFieldConfig<Brand>[] = [
  // id
  {
    name: 'id',
    label: 'id',
    hidden: false,
    disabled: true,
    hasFeedback: false,
    allowClear: false,
    input: {
      type: 'Text',
    },
  },
  // name
  {
    name: 'name',
    label: 'name',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'string', min: 3, max: 50, required: true }],
    input: {
      type: 'Text',
    },
  },
  // description
  {
    name: 'description',
    label: 'description',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'string', min: 5, max: 100, required: true }],
    input: {
      type: 'TextArea',
    },
  },
  // isActive
  {
    name: 'isActive',
    label: 'active',
    allowClear: false,
    rules: [{ type: 'string' }],
    input: {
      type: 'Select',
      options: booleanSelectFieldOptions,
    },
  },
]

export default brandUpdateFormFields
