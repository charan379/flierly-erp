import { FormFieldConfig } from '@/components/FormField'
import { accessOptions } from '@/constants/select-options.constant'
import { createBooleanFormField, createCodeFormField, createEntityFormField, createIdFormField, createNameFormField } from '@/utils/create-dynamic-formfield'

const createPrivilegeEditFormFields = (): FormFieldConfig<Privilege>[] => {

  return [
    // id
    createIdFormField({}),
    // name
    createNameFormField({ access: { permission: /^privilege\.update$/, ifNoAccess: 'disable' }, entity: 'privilege', forUpdateForm: true }),
    // entity
    createEntityFormField({ access: { permission: /^privilege\.manage$/, ifNoAccess: 'disable' } }),
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
    createBooleanFormField({ access: { permission: /^privilege\.manage$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),
    // code
    createCodeFormField({ access: { permission: /^privilege\.manage$/, ifNoAccess: 'disable' }, entity: 'privilege', forUpdateForm: true }),
  ]
}

export default createPrivilegeEditFormFields
