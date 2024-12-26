import { SearchTransformKeyFn } from '@ant-design/pro-components'

export type TransformerKey =
  | 'textValue'
  | 'trimTextValue'
  | 'textWithRegex'
  | 'inArray'
  | 'notInArray'
  | 'dateRange'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'greaterThan'
  | 'lessThan'
  | 'notEqual'
  | 'notEqualTo'
  | 'equalTo'
  | 'between'
  | 'notBetween'
  | 'isNull'
  | 'isNotNull'
  | 'like'
  | 'notLike'
  | 'ilike'
  | 'notIlike'
  | 'startsWith'
  | 'notStartsWith'
  | 'endsWith'
  | 'notEndsWith'
  | 'regex'
  | 'notRegex'
  | 'regexi'
  | 'notRegexi'

const queryTransformers: Record<TransformerKey, SearchTransformKeyFn> = {
  textValue: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: value.trim() }
    }
    return null
  },

  trimTextValue: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: value.trim() }
    }
    return null
  },

  textWithRegex: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: `/${value}/i` }
    }
    return null
  },

  inArray: (value: unknown[], namePath: string): Record<string, any> | null => {
    if (Array.isArray(value) && value.length > 0) {
      return { [namePath]: { $in: value } }
    }
    return null
  },

  notInArray: (value: unknown[], namePath: string): Record<string, any> | null => {
    if (Array.isArray(value) && value.length > 0) {
      return { [namePath]: { $notIn: value } }
    }
    return null
  },

  dateRange: (value: [string, string], namePath: string): Record<string, any> | null => {
    if (Array.isArray(value) && value.length === 2) {
      const [startDate, endDate] = value
      const start = new Date(startDate)
      const end = new Date(endDate)
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        return {
          [namePath]: {
            $gte: start.toISOString(),
            $lte: end.toISOString(),
          },
        }
      }
    }
    return null
  },

  greaterThanOrEqual: (value: number | string | Date, namePath: string): Record<string, any> | null => {
    if (value != null) {
      return { [namePath]: { $gte: value } }
    }
    return null
  },

  lessThanOrEqual: (value: number | string | Date, namePath: string): Record<string, any> | null => {
    if (value != null) {
      return { [namePath]: { $lte: value } }
    }
    return null
  },

  greaterThan: (value: number | string | Date, namePath: string): Record<string, any> | null => {
    if (value != null) {
      return { [namePath]: { $gt: value } }
    }
    return null
  },

  lessThan: (value: number | string | Date, namePath: string): Record<string, any> | null => {
    if (value != null) {
      return { [namePath]: { $lt: value } }
    }
    return null
  },

  notEqual: (value: number | string | Date, namePath: string): Record<string, any> | null => {
    if (value != null) {
      return { [namePath]: { $ne: value } }
    }
    return null
  },

  notEqualTo: (value: number | string | Date, namePath: string): Record<string, any> | null => {
    if (value != null) {
      return { [namePath]: { $notEqualTo: value } }
    }
    return null
  },

  equalTo: (value: number | string | Date, namePath: string): Record<string, any> | null => {
    if (value != null) {
      return { [namePath]: { $equalTo: value } }
    }
    return null
  },

  between: (value: [number | string | Date, number | string | Date], namePath: string): Record<string, any> | null => {
    if (Array.isArray(value) && value.length === 2) {
      const [start, end] = value
      return { [namePath]: { $between: [start, end] } }
    }
    return null
  },

  notBetween: (value: [number | string | Date, number | string | Date], namePath: string): Record<string, any> | null => {
    if (Array.isArray(value) && value.length === 2) {
      const [start, end] = value
      return { [namePath]: { $notBetween: [start, end] } }
    }
    return null
  },

  isNull: (value: boolean, namePath: string): Record<string, any> | null => {
    if (value === true) {
      return { [namePath]: { $isNull: true } }
    }
    return null
  },

  isNotNull: (value: boolean, namePath: string): Record<string, any> | null => {
    if (value === true) {
      return { [namePath]: { $isNotNull: true } }
    }
    return null
  },

  like: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $like: `%${value}%` } }
    }
    return null
  },

  notLike: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $notLike: `%${value}%` } }
    }
    return null
  },

  ilike: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $ilike: `%${value}%` } }
    }
    return null
  },

  notIlike: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $notIlike: `%${value}%` } }
    }
    return null
  },

  startsWith: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $startsWith: value } }
    }
    return null
  },

  notStartsWith: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $notStartsWith: value } }
    }
    return null
  },

  endsWith: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $endsWith: value } }
    }
    return null
  },

  notEndsWith: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $notEndsWith: value } }
    }
    return null
  },

  // New regex-based transformers
  regex: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $regex: value } }
    }
    return null
  },

  notRegex: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      try {
        const regex = new RegExp(value)
        return { [namePath]: { $notRegex: regex } }
      } catch (e) {
        return null // Invalid regex pattern
      }
    }
    return null
  },

  regexi: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      return { [namePath]: { $regexi: value } }
    }
    return null
  },

  notRegexi: (value: string, namePath: string): Record<string, any> | null => {
    if (value && value?.trim?.()?.length > 0) {
      try {
        const regex = new RegExp(value, 'i') // Case-insensitive regex
        return { [namePath]: { $notRegexi: regex } }
      } catch (e) {
        return null // Invalid regex pattern
      }
    }
    return null
  },
}

export default queryTransformers
