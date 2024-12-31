import { FormFieldConfig } from '@/components/FormField'
import entityExistenceValidator from '@/utils/entity-existence.validator'
import regexConstants from '@/constants/regex.constants'
import { createBooleanFormField, createEmailFormField, createIdFormField, createMobileFormField } from '@/utils/create-dynamic-formfield'

const createUserEditFormFields = (): FormFieldConfig<User>[] => [
  // id
  createIdFormField({}),
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
          return entityExistenceValidator('username-validation-u-1', {
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
  createEmailFormField({ access: { permission: /^user\.update$/, ifNoAccess: 'disable' }, entity: 'user', forUpdateForm: true }),
  // mobile
  createMobileFormField({ access: { permission: /^user\.update$/, ifNoAccess: 'disable' }, entity: 'user', forUpdateForm: true }),
  // isActive
  createBooleanFormField({ access: { permission: /^user\.manage$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),
];

export default createUserEditFormFields
