import { FormFieldConfig } from '@/components/FormField'
import { activeFieldOptions } from '@/constants/select-options.constant'

const productUpdateFormFields: FormFieldConfig<Product>[] = [
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
    allowClear: true,
    rules: [{ type: 'string', min: 3, max: 50, required: true }],
    input: {
      type: 'Text',
    },
  },
  // sku
  {
    name: 'sku',
    label: 'sku',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'string', min: 3, max: 50, required: true }],
    input: {
      type: 'Text',
    },
  },
  // hsn
  {
    name: 'hsn',
    label: 'hsn',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'number', required: true }],
    input: {
      type: 'Number',
    },
  },
  // isSerialized
  {
    name: 'isSerialized',
    label: 'isSerialized',
    allowClear: false,
    rules: [{ type: 'boolean' }],
    input: {
      type: 'Switch',
    },
  },
  // isComposite
  {
    name: 'isComposite',
    label: 'isComposite',
    allowClear: false,
    rules: [{ type: 'boolean' }],
    input: {
      type: 'Switch',
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
  // price
  {
    name: 'price',
    label: 'price',
    hasFeedback: true,
    allowClear: true,
    rules: [{ type: 'number', required: true }],
    input: {
      type: 'Number',
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
  // Add form fields for Product
]

export default productUpdateFormFields
