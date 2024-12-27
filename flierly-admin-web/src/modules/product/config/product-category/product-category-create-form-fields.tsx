import { FormFieldConfig } from '@/components/FormField'
import { activeFieldOptions } from '@/constants/select-options.constant'

const productCategoryCreateFormFields: FormFieldConfig<ProductCategory>[] = [
  // name
  {
    name: 'name',
    label: 'name',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'string', min: 3, max: 50, required: true }],
    input: {
      type: 'Text',
    },
  },
  // code
  {
    name: 'code',
    label: 'code',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'string', min: 3, max: 50, required: true }],
    input: {
      type: 'Text',
    },
  },
  // description
  {
    name: 'description',
    label: 'description',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'string', min: 5, max: 100, required: true }],
    input: {
      type: 'TextArea',
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
      options: activeFieldOptions,
    },
  },
  // Add form fields for ProductCategory
]

export default productCategoryCreateFormFields
