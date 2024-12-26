import { FormFieldConfig } from '@/components/FormField'
import entityExistenceValidator from '@/utils/entityExistenceValidator'
import { activeFieldOptions } from '@/constants/select-options.constant'

const roleCreateFields: FormFieldConfig<Role>[] = [
  // name
  {
    name: 'name',
    label: 'name',
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: 'string', min: 5, max: 30, required: true },
      () => ({
        validator(_, value) {
          if (!value || value?.length < 5 || value?.length > 30) return Promise.resolve()
          return entityExistenceValidator('role-name-validation-c-1', {
            entity: 'role',
            filters: { name: { $ilike: value } },
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
    allowClear: true,
    rules: [
      { type: 'string', pattern: /^[a-z]+-[a-z0-9]+$/, message: 'invalid_code' },
      { min: 5, max: 25, required: true },
      () => ({
        validator(_, value) {
          if (!value || /^[a-z]+-[a-z0-9]+$/.test(value) || value?.length < 5 || value?.length > 25) return Promise.resolve()
          return entityExistenceValidator('role-code-validation-c-1', {
            entity: 'role',
            filters: { code: value },
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
    rules: [{ type: 'string' }],
    input: {
      type: 'Select',
      options: activeFieldOptions,
    },
  },
]

export default roleCreateFields
