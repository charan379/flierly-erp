import { FormFieldConfig } from '@/components/FormField'
import entityExistenceValidator from '@/utils/entity-existence.validator'
import { statusFieldOptions } from '@/constants/select-options.constant'
import regexConstants from '@/constants/regex.constants'

const userCreateFormFields: FormFieldConfig<User>[] = [
  // name
  {
    name: 'username',
    label: 'username',
    hasFeedback: true,
    allowClear: true,
    rules: [
      { type: 'string', min: 5, max: 20, required: true },
      { pattern: regexConstants.username, message: 'invalid_username' },
      () => ({
        validator: (_, value) => {
          if (!value || value.length < 5 || value.length > 20 || !regexConstants.username.test(value)) {
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
          if (!value || !regexConstants.email.test(value)) return Promise.resolve()
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
      { type: 'string', required: true, min: 10, max: 15 },
      { pattern: regexConstants.mobile, message: 'invalid_mobile' },
      () => ({
        validator(_, value) {
          if (!value || value.length < 10 || value.length > 15 || !regexConstants.mobile.test(value)) return Promise.resolve()
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
      options: statusFieldOptions,
    },
  },
]

export default userCreateFormFields
