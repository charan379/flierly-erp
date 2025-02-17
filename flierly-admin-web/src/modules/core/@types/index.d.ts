interface ApiResponse<T> {
  success: boolean
  result: T | null
  message: string
  controller: string
  requestUrl: string
  error?: ErrorDetails | null
  httpCode: number
}

type CurdTableContextMenuKey = 'view' | 'edit' | 'inactivate' | 'activate' | 'delete' | 'close' | 'restore';

interface PageData<T> {
  data: T[]
  page: number
  pageSize: number
  totalResults: number
  totalPages: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  nextPage?: number
  previousPage?: number
  sort?: Record<string, any>
}

interface ErrorDetails {
  name: string
  httpCode: number
  reason: string
  stack?: string
  message: string
}

interface EntityTimeStamps {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

interface EntityDetails {
  entity: string;
  code: string;
  controller: string;
  filePath: string;
}