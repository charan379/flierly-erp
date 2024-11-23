type TransformerFunction = (
    value: any,
    namePath: string,
    allValues: Record<string, any>
  ) => Record<string, any> | null;
  
  const queryTransformers: Record<string, TransformerFunction> = {
    trimTextValue: (value: any, namePath: string): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: value.trim() };
      }
      return null;
    },
  
    textWithRegex: (value: any, namePath: string): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: `/${value}/i` };
      }
      return null;
    },
  
    inArray: (value: any[], namePath: string): Record<string, any> | null => {
      if (Array.isArray(value) && value.length > 0) {
        return { [namePath]: { $in: value } };
      }
      return null;
    },
  
    dateRange: (
      value: [string, string],
      namePath: string
    ): Record<string, any> | null => {
      if (Array.isArray(value) && value.length === 2) {
        const startDate = new Date(value[0]);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(value[1]);
        endDate.setHours(23, 59, 59, 999);
        return {
          [namePath]: {
            $gte: startDate.toISOString(),
            $lte: endDate.toISOString(),
          },
        };
      }
      return null;
    },
  
    greaterThanOrEqual: (
      value: any,
      namePath: string
    ): Record<string, any> | null => {
      if (value !== undefined && value !== null) {
        return { [namePath]: { $gte: value } };
      }
      return null;
    },
  
    lessThanOrEqual: (
      value: any,
      namePath: string
    ): Record<string, any> | null => {
      if (value !== undefined && value !== null) {
        return { [namePath]: { $lte: value } };
      }
      return null;
    },
  
    greaterThan: (value: any, namePath: string): Record<string, any> | null => {
      if (value !== undefined && value !== null) {
        return { [namePath]: { $gt: value } };
      }
      return null;
    },
  
    lessThan: (value: any, namePath: string): Record<string, any> | null => {
      if (value !== undefined && value !== null) {
        return { [namePath]: { $lt: value } };
      }
      return null;
    },
  
    notEqual: (value: any, namePath: string): Record<string, any> | null => {
      if (value !== undefined && value !== null) {
        return { [namePath]: { $ne: value } };
      }
      return null;
    },
  
    between: (
      value: [any, any],
      namePath: string
    ): Record<string, any> | null => {
      if (Array.isArray(value) && value.length === 2) {
        return { [namePath]: { $between: value } };
      }
      return null;
    },
  
    notBetween: (
      value: [any, any],
      namePath: string
    ): Record<string, any> | null => {
      if (Array.isArray(value) && value.length === 2) {
        return { [namePath]: { $notBetween: value } };
      }
      return null;
    },
  
    isNull: (value: boolean, namePath: string): Record<string, any> | null => {
      if (value === true) {
        return { [namePath]: { $isNull: true } };
      }
      return null;
    },
  
    isNotNull: (value: boolean, namePath: string): Record<string, any> | null => {
      if (value === true) {
        return { [namePath]: { $isNotNull: true } };
      }
      return null;
    },
  
    like: (value: string, namePath: string): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: { $like: `%${value}%` } };
      }
      return null;
    },
  
    notLike: (value: string, namePath: string): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: { $notLike: `%${value}%` } };
      }
      return null;
    },
  
    ilike: (value: string, namePath: string): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: { $ilike: `%${value}%` } };
      }
      return null;
    },
  
    notIlike: (value: string, namePath: string): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: { $notIlike: `%${value}%` } };
      }
      return null;
    },
  
    startsWith: (value: string, namePath: string): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: { $startsWith: value } };
      }
      return null;
    },
  
    notStartsWith: (
      value: string,
      namePath: string
    ): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: { $notStartsWith: value } };
      }
      return null;
    },
  
    endsWith: (value: string, namePath: string): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: { $endsWith: value } };
      }
      return null;
    },
  
    notEndsWith: (
      value: string,
      namePath: string
    ): Record<string, any> | null => {
      if (typeof value === "string" && value.trim().length > 0) {
        return { [namePath]: { $notEndsWith: value } };
      }
      return null;
    },
  };
  
  export default queryTransformers;
  