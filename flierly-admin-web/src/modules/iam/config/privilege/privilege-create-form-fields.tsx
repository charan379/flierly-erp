import { FormFieldConfig } from '@/components/FormField'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options'
import entityExistenceValidator from '@/utils/entity-existence.validator'
import { accessOptions, booleanSelectFieldOptions } from '@/constants/select-options.constant'

const privilegeCreateFormFields: FormFieldConfig<Privilege>[] = [
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
          if (!value || value.length < 5 || value.length > 30) return Promise.resolve()
          return entityExistenceValidator('privilege-name-validation-c-1', {
            entity: 'privilege',
            filters: { name: { $ilike: value } },
          })
        },
      }),
    ],
    input: {
      type: 'Text',
    },
  },
  // entity
  {
    name: 'entity',
    label: 'entity',
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^privilege\.create$/, ifNoAccess: 'disable' },
    rules: [{ required: true }],
    input: {
      type: 'SelectRemoteOptions',
      asyncOptionsFetcher: fetchEntityOptions,
      debounceTimeout: 300,
    },
  },
  // access
  {
    name: 'access',
    label: 'access',
    allowClear: false,
    access: { permission: /^privilege\.create$/, ifNoAccess: 'disable' },
    rules: [
      {
        type: 'enum',
        required: true,
        enum: ['Create', 'Read', 'Update', 'Delete', 'Manage'],
      },
    ],
    input: {
      type: 'Select',
      options: accessOptions,
    },
  },
  // isActive
  {
    name: 'isActive',
    label: 'active',
    access: { permission: /^privilege\.manage$/, ifNoAccess: 'disable' },
    allowClear: false,
    rules: [{ type: 'string' }],
    input: {
      type: 'Select',
      options: booleanSelectFieldOptions,
    },
  },
  // code
  {
    name: 'code',
    label: 'code',
    hasFeedback: true,
    allowClear: true,
    access: { permission: /^privilege\.create$/, ifNoAccess: 'disable' },
    rules: [
      { type: 'string', pattern: /^[a-z-]+\.[a-z-]+$/, message: 'invalid_code' },
      { min: 5, max: 25, required: true },
      () => ({
        validator(_, value) {
          if (!value || !/^[a-z-]+\.[a-z-]+$/.test(value) || value.length < 5 || value.length > 25) return Promise.resolve()
          return entityExistenceValidator('privilege-code-validation-c-1', {
            entity: 'privilege',
            filters: { code: value },
            rejectionMessage: 'privilege_with_same_code_already_exists',
          })
        },
      }),
    ],
    input: {
      type: 'Text',
    },
  },
]

export default privilegeCreateFormFields
