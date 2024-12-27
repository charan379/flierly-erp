import { FormFieldConfig } from '@/components/FormField'
import { activeFieldOptions } from '@/constants/select-options.constant'

const productSubCategoryCreateFormFields: FormFieldConfig<ProductSubCategory>[] = [
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
  // parentCategory
  {
    name: 'parentCategory',
    label: 'parentCategory',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'object', required: true }],
    input: {
      type: 'Select',
      options: [], // Add options for parent categories
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
  // Add form fields for ProductSubCategory
]

export default productSubCategoryCreateFormFields
