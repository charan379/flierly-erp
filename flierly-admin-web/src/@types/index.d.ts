type ApiResponse<T> = {
  success: boolean
  result: T | null
  message: string
  controller: string
  requestUrl: string
  error?: ErrorDetails | null
  httpCode: number
}

type PageData<T> = {
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

type ErrorDetails = {
  name: string
  httpCode: number
  reason: string
  stack?: string
  message: string
}

type EntityTimeStamps = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

type EntityDetails = {
  entity: string;
  code: string;
  controller: string;
  filePath: string;
}