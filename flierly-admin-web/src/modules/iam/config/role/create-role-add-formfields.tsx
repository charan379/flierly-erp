import { FormFieldConfig } from '@/components/FormField'
import { createBooleanFormField, createCodeFormField, createDescriptionFormField, createNameFormField } from '@/utils/create-dynamic-formfield'

const createRoleAddFormFields = (): FormFieldConfig<Role>[] => {

  return [
    // name
    createNameFormField({ access: { permission: /^role\.create$/, ifNoAccess: 'disable' }, entity: 'role' }),
    // code
    createCodeFormField({ access: { permission: /^role\.create$/, ifNoAccess: 'disable' }, entity: 'role', }),
    // description
    createDescriptionFormField({ access: { permission: /^role\.create$/, ifNoAccess: 'disable' } }),
    // isActive
    createBooleanFormField({ access: { permission: /^role\.create$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),
  ]
}

export default createRoleAddFormFields
