import { FormFieldConfig } from '@/components/FormField'
import { createBooleanFormField, createDescriptionFormField, createIdFormField, createNameFormField } from '@/utils/create-dynamic-formfield'

const createBrandEditFormFields = (): FormFieldConfig<Brand>[] => {

  return [
    // id
    createIdFormField({}),
    // name
    createNameFormField({ access: { permission: /^brand\.update$/, ifNoAccess: 'disable' }, entity: 'brand', forUpdateForm: true }),
    // description
    createDescriptionFormField({ access: { permission: /^brand\.update$/, ifNoAccess: 'disable' } }),
    // isActive
    createBooleanFormField({ access: { permission: /^brand\.update$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),
  ]
}

export default createBrandEditFormFields
