import { FormFieldConfig } from '@/components/FormField'
import { statusFieldOptions } from '@/constants/select-options.constant'
import entityExistenceValidator from '@/utils/entity-existence.validator'

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
    rules: [{ type: 'string', min: 3, max: 50, required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || value.length < 5 || value.length > 50) return Promise.resolve()
        return entityExistenceValidator('brand-name-validation-c-1', {
          entity: 'brand',
          filters: {
            id: { $notEqualTo: getFieldValue('id') },
            name: { $ilike: value }
          },
        })
      },
    }),
    ],
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
    rules: [],
    input: {
      type: 'Select',
      options: statusFieldOptions,
    },
    convertValue: (value) => {
      if (value === true) {
        return 'true'
      } else if (value === false) {
        return 'false'
      } else {
        return value
      }
    },
  },
]

export default brandUpdateFormFields
