import { FormFieldConfig } from '@/components/FormField'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetchEntityOptions'
import entityExistenceValidator from '@/utils/entityExistenceValidator'
import { accessOptions, activeFieldOptions } from '@/constants/select-options.constant'

const privilegeUpdateFields: FormFieldConfig<Privilege>[] = [
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
    access: { permission: /^privilege\.manage$/, ifNoAccess: 'disable' },
    rules: [
      { type: 'string', min: 5, max: 30, required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve()
          return entityExistenceValidator('privilege-name-validation-u-1', {
            entity: 'privilege',
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
  // entity
  {
    name: 'entity',
    label: 'entity',
    allowClear: false,
    hasFeedback: false,
    access: { permission: /^privilege\.manage$/, ifNoAccess: 'disable' },
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
    access: { permission: /^privilege\.manage$/, ifNoAccess: 'disable' },
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
  // code
  {
    name: 'code',
    label: 'code',
    hasFeedback: true,
    allowClear: false,
    access: { permission: /^privilege\.manage$/, ifNoAccess: 'disable' },
    rules: [
      { type: 'string', pattern: /^[a-z-]+\.[a-z-]+$/, message: 'invalid_code' },
      { min: 5, max: 25, required: true },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (value === undefined) return Promise.resolve()
          return entityExistenceValidator('privilege-code-validation-u-1', {
            entity: 'privilege',
            filters: { id: { $notEqualTo: getFieldValue('id') }, code: value },
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

export default privilegeUpdateFields
