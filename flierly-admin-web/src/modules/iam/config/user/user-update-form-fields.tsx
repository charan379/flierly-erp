import { FormFieldConfig } from '@/components/FormField'
import entityExistenceValidator from '@/utils/entity-existence.validator'
import { statusFieldOptions } from '@/constants/select-options.constant'
import regexConstants from '@/constants/regex.constants'

const userUpdateFormFields: FormFieldConfig<User>[] = [
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
    name: 'username',
    label: 'username',
    hasFeedback: true,
    allowClear: false,
    rules: [
      { type: 'string', min: 5, max: 20, required: true },
      { pattern: regexConstants.username, message: 'invalid_username' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || value.length < 5 || value.length > 20 || !regexConstants.username.test(value)) return Promise.resolve()
          return entityExistenceValidator('user-name-validation-u-1', {
            entity: 'user',
            filters: {
              id: { $notEqualTo: getFieldValue('id') },
              username: { $ilike: value },
            },
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
    allowClear: false,
    rules: [
      { type: 'email', required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return Promise.resolve()
          return entityExistenceValidator('user-email-validation-u-1', {
            entity: 'user',
            filters: { id: { $notEqualTo: getFieldValue('id') }, email: value },
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
    allowClear: false,
    rules: [
      { type: 'string', min: 10, max: 15, required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || value.length < 10 || value.length > 15 || !regexConstants.mobile.test(value)) return Promise.resolve()
          return entityExistenceValidator('user-mobile-validation-u-1', {
            entity: 'user',
            filters: { id: { $notEqualTo: getFieldValue('id') }, mobile: value },
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

export default userUpdateFormFields
