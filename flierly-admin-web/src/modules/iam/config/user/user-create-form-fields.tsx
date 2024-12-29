import { FormFieldConfig } from '@/components/FormField'
import entityExistenceValidator from '@/utils/entity-existence.validator'
import { booleanSelectFieldOptions } from '@/constants/select-options.constant'

const userCreateFormFields: FormFieldConfig<User>[] = [
  // name
  {
    name: 'username',
    label: 'username',
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: 'string', min: 5, max: 20, required: true },
      { pattern: /^[a-z0-9_]+$/, message: 'invalid_username' },
      () => ({
        validator: (_, value) => {
          if (!value || value.length < 5 || value.length > 20 || !/^[a-z0-9_]+$/.test(value)) {
            return Promise.resolve()
          }
          return entityExistenceValidator('user-name-validation-c-1', {
            entity: 'user',
            filters: { username: { $ilike: value } },
          })
        },
      }),
    ],
    input: {
      type: 'Text',
    },
  },
  // email
  {
    name: 'email',
    label: 'email',
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: 'email', required: true },
      () => ({
        validator(_, value) {
          if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return Promise.resolve()
          }
          return entityExistenceValidator('user-email-validation-c-1', {
            entity: 'user',
            filters: { email: value },
            rejectionMessage: 'user_with_same_email_already_exists',
          })
        },
      }),
    ],
    input: {
      type: 'Text',
    },
  },
  // mobile
  {
    name: 'mobile',
    label: 'mobile',
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: 'string', required: true },
      { pattern: /^\+\d{1,3}[\s][6-9]\d{9}$/, message: 'invalid_mobile' },
      () => ({
        validator(_, value) {
          if (!value || !/^\+\d{1,3}[\s][6-9]\d{9}$/.test(value)) {
            return Promise.resolve()
          }
          return entityExistenceValidator('user-mobile-validation-c-1', {
            entity: 'user',
            filters: { mobile: value },
            rejectionMessage: 'user_with_same_mobile_already_exists',
          })
        },
      }),
    ],
    input: {
      type: 'Text',
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

export default userCreateFormFields
