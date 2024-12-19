type CrudModuleState = {
  rowMenu: {
    open: boolean;
    position: { x: number; y: number };
    currentRecord: Record<string, any>;
  };
  filters: Record<string, any>;
  conditions: QueryCondition[]; // Add conditions to state
  binMode: boolean;
  updateForm: {
    open: boolean;
    data: Record<string, any>;
    id: number;
  };
}

type CrudModuleContextType = {
  state: CrudModuleState;
  dispatcher?: React.Dispatch<Action>
}

// Props type for the page function
type EntitiesPageRequest = {
  entity: string;
  loadRelations?: [];
  binMode?: boolean;
  pagination?: {
    limit: number;
    page: number;
  };
  filters?: Record<string, any>;
  sort?: Record<string, any>;
  signal?: AbortSignal;
};

// Props type for the page function
type RelatedEntitiesPageRequest = {
  owningEntity: string,
  owningEntityId: number,
  inverseEntity: string,
  inverseSideField: string,
  owningSideField: string,
  pagination?: {
    limit: number;
    page: number;
  };
  filters?: Record<string, any>;
  sort?: Record<string, any>;
  type?: 'allocated' | 'unallocated'
  signal?: AbortSignal;
}


// Props type for the create function
type CreateEntityRequest<T = Record<string, any>> = {
  entity: string;
  data: T;
  signal?: AbortSignal;
};

// Props type for the update function
type UpdateEntityRequest<T = Record<string, any>> = {
  entity: string;
  id: string | number;
  data: T;
  signal?: AbortSignal;
};

// Props type for the update function
type UpdateAssociatedEntityRecordsRequest<T = Record<string, any>> = {
  owningEntity: string,
  owningEntityId: number;
  inverseField: string;
  newArray?: number[];
  addOne?: number;
  removeOne?: number;
  addMultiple?: number[];
  removeMultiple?: number[];
  signal?: AbortSignal;
};

// Props type for the exists function
type EntityRecordExistsRequest = {
  entity: string;
  filters?: Record<string, any>;
  signal?: AbortSignal;
};

// Props type for the delete function
type EntityRecordsDeleteRequest = {
  entity: string;
  ids: number[];
  signal?: AbortSignal;
};

// Props type for the activate function
type EntityRecordsActivateRequest = {
  entity: string;
  ids: number[];
  signal?: AbortSignal;
};

// Props type for the inactivate function
type EntityRecordsInactivateRequest = {
  entity: string;
  ids: number[];
  signal?: AbortSignal;
};

// Props type for the restore function
type EntityRecordsRestoreRequest = {
  entity: string;
  ids: number[];
  signal?: AbortSignal;
};
