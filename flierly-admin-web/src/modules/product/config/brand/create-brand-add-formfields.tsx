import { FormFieldConfig } from '@/components/FormField'
import { createBooleanFormField, createDescriptionFormField, createNameFormField } from '@/utils/create-dynamic-formfield'

const createBrandAddFormFields = (): FormFieldConfig<Brand>[] => {

  return [
    // name
    createNameFormField({
      access: { permission: /^brand\.create$/, ifNoAccess: 'disable' },
      entity: 'brand',
    }),
    // description
    createDescriptionFormField({ access: { permission: /^brand\.create$/, ifNoAccess: 'disable' } }),
    // isActive
    createBooleanFormField({ access: { permission: /^brand\.manage$/, ifNoAccess: 'disable' }, label: 'active', name: 'isActive', optionLabels: ['active', 'inactive'] }),
  ]
}

export default createBrandAddFormFields
