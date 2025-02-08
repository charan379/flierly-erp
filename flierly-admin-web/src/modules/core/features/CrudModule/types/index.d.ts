interface CrudModuleState {
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

interface CrudModuleContextType {
  state: CrudModuleState
  dispatcher?: React.Dispatch<Action>
}

// Props type for the page function
interface EntityRecordsPageRequest<E> {
  entity: string
  loadRelations?: Array<keyof E>,
  binMode?: boolean
  limit: number
  page: number
  filters?: Record<string, any>
  sort?: { property: string, order: "desc" | "asc" }
  signal?: AbortSignal
}

// Props type for the page function
interface AssociatedEntityRecordsPageRequest<E, AE> {
  entity: string
  entityRecordId: number
  associatedEntity: string
  entitySideField: keyof E
  associatedSideField: keyof AE
  limit: number
  page: number
  filters?: Record<string, any>
  sort?: { property: string, order: "desc" | "asc" }
  type?: 'allocated' | 'unallocated'
  signal?: AbortSignal
}

// Props type for the create function
interface CreateEntityRecordRequest<E = Record<string, any>> {
  entity: string
  data: E
  signal?: AbortSignal
}

// Props type for the update function
interface UpdateEntityRecordRequest<E = Record<string, any>> {
  entity: string
  id: string | number
  data: E
  signal?: AbortSignal
}

// Props type for the update function
interface UpdateAssociatedEntityRecordsRequest<E> {
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
interface EntityRecordExistsRequest<_E> {
  entity: string
  filters?: Record<string, any>
  signal?: AbortSignal
}

// Props type for the delete function
interface EntityRecordsDeleteRequest {
  entity: string
  ids: number[]
  signal?: AbortSignal
}

// Props type for the activate function
interface EntityRecordsActivateRequest {
  entity: string
  ids: number[]
  signal?: AbortSignal
}

// Props type for the inactivate function
interface EntityRecordsInactivateRequest {
  entity: string
  ids: number[]
  signal?: AbortSignal
}

// Props type for the restore function
interface EntityRecordsRestoreRequest {
  entity: string
  ids: number[]
  signal?: AbortSignal
}
