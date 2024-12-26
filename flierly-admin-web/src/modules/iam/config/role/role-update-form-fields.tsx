import { FormFieldConfig } from '@/components/FormField'
import entityExistenceValidator from '@/utils/entity-existence.validator'
import { activeFieldOptions } from '@/constants/select-options.constant'

const roleUpdateFormFields: FormFieldConfig<Role>[] = [
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
    allowClear: false,
    rules: [
      { type: 'string', min: 5, max: 30, required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || value?.length < 5 || value?.length > 30) return Promise.resolve()
          return entityExistenceValidator('role-name-validation-u-1', {
            entity: 'role',
            filters: {
              id: { $notEqualTo: getFieldValue('id') },
              name: { $ilike: value },
            },
          })
        },
      }),
    ],
    input: {
      type: 'Text',
    },
  },
  // code
  {
    name: 'code',
    label: 'code',
    hasFeedback: true,
    allowClear: false,
    rules: [
      { type: 'string', pattern: /^[a-z]+-[a-z0-9]+$/, message: 'invalid_code' },
      { min: 5, max: 25, required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || /^[a-z]+-[a-z0-9]+$/.test(value) || value?.length < 5 || value.length > 25) return Promise.resolve()
          return entityExistenceValidator('role-code-validation-u-1', {
            entity: 'role',
            filters: { id: { $notEqualTo: getFieldValue('id') }, code: value },
            rejectionMessage: 'role_with_same_code_already_exists',
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
      options: activeFieldOptions,
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

export default roleUpdateFormFields
