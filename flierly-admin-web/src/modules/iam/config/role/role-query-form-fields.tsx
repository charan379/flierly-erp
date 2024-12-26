import { QueryFieldConfig } from '@/features/QueryBuilder/QueryBuilder'
import { activeFieldOptions } from '@/constants/select-options.constant'

const roleQueryFormFields: QueryFieldConfig<Role>[] = [
  // id
  {
    field: { label: 'ID', namePath: 'id' },
    conditions: [
      {
        condition: { label: 'Equals to', namePath: 'equalTo' },
        formField: { input: { type: 'Number' } },
      },
      {
        condition: { label: 'Between', namePath: 'between' },
        formField: { input: { type: 'NumberRange' } },
      },
      {
        condition: { label: 'Greater than', namePath: 'greaterThan' },
        formField: { input: { type: 'Number' } },
      },
      {
        condition: { label: 'Less than', namePath: 'lessThan' },
        formField: { input: { type: 'Number' } },
      },
    ],
  },
  // name
  {
    field: { label: 'Role Name', namePath: 'name' },
    conditions: [
      {
        condition: { label: 'Equals to', namePath: 'equalTo' },
        formField: { input: { type: 'Text' } },
      },
      {
        condition: { label: 'Contains', namePath: 'like' },
        formField: { input: { type: 'Text' } },
      },
      {
        condition: { label: 'Contains (case-insensitive)', namePath: 'ilike' },
        formField: { input: { type: 'Text' } },
      },
      {
        condition: { label: 'Regex', namePath: 'regex' },
        formField: { input: { type: 'Text' }, rules: [{ type: 'regexp' }] },
      },
      {
        condition: { label: 'Regex (case-insensitive)', namePath: 'regexi' },
        formField: { input: { type: 'Text' }, rules: [{ type: 'regexp' }] },
      },
      {
        condition: { label: 'Starts with', namePath: 'startsWith' },
        formField: { input: { type: 'Text' }, rules: [{ type: 'string' }] },
      },
      {
        condition: { label: 'Ends with', namePath: 'endsWith' },
        formField: { input: { type: 'Text' }, rules: [{ type: 'string' }] },
      },
    ],
  },
  // code
  {
    field: { label: 'Role Code', namePath: 'code' },
    conditions: [
      {
        condition: { label: 'Equals to', namePath: 'equalTo' },
        formField: { input: { type: 'Text' } },
      },
      {
        condition: { label: 'Contains', namePath: 'like' },
        formField: { input: { type: 'Text' } },
      },
      {
        condition: { label: 'Contains (case-insensitive)', namePath: 'ilike' },
        formField: { input: { type: 'Text' } },
      },
      {
        condition: { label: 'Regex', namePath: 'regex' },
        formField: { input: { type: 'Text' }, rules: [{ type: 'regexp' }] },
      },
      {
        condition: { label: 'Regex (case-insensitive)', namePath: 'regexi' },
        formField: { input: { type: 'Text' }, rules: [{ type: 'regexp' }] },
      },
      {
        condition: { label: 'Starts with', namePath: 'startsWith' },
        formField: { input: { type: 'Text' }, rules: [{ type: 'string' }] },
      },
      {
        condition: { label: 'Ends with', namePath: 'endsWith' },
        formField: { input: { type: 'Text' }, rules: [{ type: 'string' }] },
      },
    ],
  },
  // isActive
  {
    field: { label: 'Role Status', namePath: 'isActive' },
    conditions: [
      {
        condition: { label: 'Equals to', namePath: 'trimTextValue' },
        formField: {
          input: {
            type: 'Select',
            options: activeFieldOptions,
          },
          rules: [{ type: 'string' }],
        },
      },
    ],
  },
  // createdAt
  {
    field: { label: 'Created At', namePath: 'createdAt' },
    conditions: [
      {
        condition: { label: 'Between', namePath: 'between' },
        formField: { input: { type: 'DateRange' } },
      },
      {
        condition: { label: 'Greater than', namePath: 'greaterThan' },
        formField: { input: { type: 'DatePicker' } },
      },
      {
        condition: { label: 'Less than', namePath: 'lessThan' },
        formField: { input: { type: 'DatePicker' } },
      },
    ],
  },
  // updatedAt
  {
    field: { label: 'Updated At', namePath: 'updatedAt' },
    conditions: [
      {
        condition: { label: 'Between', namePath: 'between' },
        formField: { input: { type: 'DateRange' } },
      },
      {
        condition: { label: 'Greater than', namePath: 'greaterThan' },
        formField: { input: { type: 'DatePicker' } },
      },
      {
        condition: { label: 'Less than', namePath: 'lessThan' },
        formField: { input: { type: 'DatePicker' } },
      },
    ],
  },
  // deletedAt
  {
    field: { label: 'Deleted At', namePath: 'deletedAt' },
    conditions: [
      {
        condition: { label: 'Between', namePath: 'between' },
        formField: { input: { type: 'DateRange' } },
      },
      {
        condition: { label: 'Greater than', namePath: 'greaterThan' },
        formField: { input: { type: 'DatePicker' } },
      },
      {
        condition: { label: 'Less than', namePath: 'lessThan' },
        formField: { input: { type: 'DatePicker' } },
      },
    ],
  },
]

export default roleQueryFormFields
