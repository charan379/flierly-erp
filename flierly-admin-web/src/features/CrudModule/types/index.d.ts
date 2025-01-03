type CrudModuleState = {
  rowMenu: {
    open: boolean
    position: { x: number; y: number }
    currentRecord: Record<string, any>
  }
  filters: Record<string, any>
  conditions: QueryCondition[] // Add conditions to state
  binMode: boolean
  updateForm: {
    open: boolean
    data: Record<string, any>
    id: number
  }
}

type CrudModuleContextType = {
  state: CrudModuleState
  dispatcher?: React.Dispatch<Action>
}

// Props type for the page function
type EntityRecordsPageRequest<E> = {
  entity: string
  loadRelations?: Array<keyof E>,
  binMode?: boolean
  pagination?: {
    limit: number
    page: number
  }
  filters?: Record<string, any>
  sort?: Record<string, "descend" | "ascend" | null>
  signal?: AbortSignal
}

// Props type for the page function
type AssociatedEntityRecordsPageRequest<E, AE> = {
  entity: string
  entityRecordId: number
  associatedEntity: string
  entitySideField: keyof E
  associatedSideField: keyof AE
  pagination?: {
    limit: number
    page: number
  }
  filters?: Record<string, any>
  sort?: Record<string, "descend" | "ascend" | null>
  type?: 'allocated' | 'unallocated'
  signal?: AbortSignal
}

// Props type for the create function
type CreateEntityRecordRequest<E = Record<string, any>> = {
  entity: string
  data: E
  signal?: AbortSignal
}

// Props type for the update function
type UpdateEntityRecordRequest<E = Record<string, any>> = {
  entity: string
  id: string | number
  data: E
  signal?: AbortSignal
}

// Props type for the update function
type UpdateAssociatedEntityRecordsRequest<E> = {
  entity: string
  entityRecordId: number
  entitySideField: keyof E
  newArray?: number[]
  addOne?: number
  removeOne?: number
  addMultiple?: number[]
  removeMultiple?: number[]
  signal?: AbortSignal
}

// Props type for the exists function
type EntityRecordExistsRequest<_E> = {
  entity: string
  filters?: Record<string, any>
  signal?: AbortSignal
}

// Props type for the delete function
type EntityRecordsDeleteRequest = {
  entity: string
  ids: number[]
  signal?: AbortSignal
}

// Props type for the activate function
type EntityRecordsActivateRequest = {
  entity: string
  ids: number[]
  signal?: AbortSignal
}

// Props type for the inactivate function
type EntityRecordsInactivateRequest = {
  entity: string
  ids: number[]
  signal?: AbortSignal
}

// Props type for the restore function
type EntityRecordsRestoreRequest = {
  entity: string
  ids: number[]
  signal?: AbortSignal
}
