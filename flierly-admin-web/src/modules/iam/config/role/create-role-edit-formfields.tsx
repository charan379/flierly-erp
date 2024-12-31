import { FormFieldConfig } from '@/components/FormField'
import { createBooleanFormField, createCodeFormField, createDescriptionFormField, createIdFormField, createNameFormField } from '@/utils/create-dynamic-formfield'

const createRoleEditFormFields = (): FormFieldConfig<Role>[] => {
  return [
    // id
    createIdFormField({}),
    // name
    createNameFormField({ access: { permission: /^role\.update$/, ifNoAccess: 'disable' }, entity: 'role', forUpdateForm: true }),
    // code
    createCodeFormField({ access: { permission: /^role\.manage$/, ifNoAccess: 'disable' }, entity: 'role', forUpdateForm: true }),
    // description
    createDescriptionFormField({ access: { permission: /^role\.update$/, ifNoAccess: 'disable' } }),
    // isActive
    createBooleanFormField({ access: { permission: /^role\.manage$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),
  ]
}

export default createRoleEditFormFields;
