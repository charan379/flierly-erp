import { QueryFieldConfig } from '@/features/QueryBuilder/QueryBuilder'
import { accessOptions, activeFieldOptions } from '@/constants/select-options.constant'
import fetchEntityOptions from '@/features/SelectRemoteOptions/utils/fetch-entity-options'

const privilegeQueryFormFields: QueryFieldConfig<Privilege>[] = [
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
    field: { label: 'Privilege Name', namePath: 'name' },
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
  // entity
  {
    field: { label: 'Entity', namePath: 'entity' },
    conditions: [
      {
        condition: { label: 'Equals to', namePath: 'equalTo' },
        formField: {
          input: {
            type: 'SelectRemoteOptions',
            asyncOptionsFetcher: fetchEntityOptions,
            debounceTimeout: 300,
          },
          rules: [{ type: 'string' }],
        },
      },
      {
        condition: { label: 'Not equals to', namePath: 'notEqualTo' },
        formField: {
          input: {
            type: 'SelectRemoteOptions',
            asyncOptionsFetcher: fetchEntityOptions,
            debounceTimeout: 300,
          },
          rules: [{ type: 'string' }],
        },
      },
      {
        condition: { label: 'IN', namePath: 'inArray' },
        formField: {
          input: {
            type: 'SelectRemoteOptions',
            asyncOptionsFetcher: fetchEntityOptions,
            debounceTimeout: 300,
            mode: 'multiple',
          },
          rules: [{ type: 'array' }],
        },
      },
      {
        condition: { label: 'Not IN', namePath: 'notInArray' },
        formField: {
          input: {
            type: 'SelectRemoteOptions',
            asyncOptionsFetcher: fetchEntityOptions,
            debounceTimeout: 300,
            mode: 'multiple',
          },
          rules: [{ type: 'array' }],
        },
      },
    ],
  },
  // access
  {
    field: { label: 'Access', namePath: 'access' },
    conditions: [
      {
        condition: { label: 'Equals to', namePath: 'equalTo' },
        formField: { input: { type: 'Select', options: accessOptions }, rules: [{ type: 'string' }] },
      },
      {
        condition: { label: 'Not equals to', namePath: 'notEqualTo' },
        formField: { input: { type: 'Select', options: accessOptions }, rules: [{ type: 'string' }] },
      },
      {
        condition: { label: 'IN', namePath: 'inArray' },
        formField: { input: { type: 'Select', options: accessOptions, mode: 'multiple' }, rules: [{ type: 'array' }] },
      },
      {
        condition: { label: 'Not IN', namePath: 'notInArray' },
        formField: { input: { type: 'Select', options: accessOptions, mode: 'multiple' }, rules: [{ type: 'array' }] },
      },
    ],
  },
  // isActive
  {
    field: { label: 'Privilege Status', namePath: 'isActive' },
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
  // code
  {
    field: { label: 'Privilege Code', namePath: 'code' },
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

export default privilegeQueryFormFields
