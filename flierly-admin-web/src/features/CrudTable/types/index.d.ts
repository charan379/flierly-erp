type CrudTableState = {
    rowMenu: {
        open: boolean;
        position: { x: number; y: number };
        currentRecord: Record<string, any>;
    };
    filters: Record<string, any>;
    binMode: boolean;
    updateForm: {
        open: boolean;
        data: Record<string, any>;
        id: number;
    };
}

// Props type for the page function
type PageProps = {
    entity: string;
    autopopulateIds?: boolean;
    binMode?: boolean;
    pagination?: {
      limit: number;
      page: number;
    };
    filters?: Record<string, any>;
    sort?: Record<string, any>;
    signal?: AbortSignal;
  };
  
  // Props type for the create function
  type CreateProps = {
    entity: string;
    data: Record<string, any>;
    signal?: AbortSignal;
  };
  
  // Props type for the update function
  type UpdateProps = {
    entity: string;
    id: string | number;
    data: Record<string, any>;
    signal?: AbortSignal;
  };
  
  // Props type for the exists function
  type ExistsProps = {
    entity: string;
    filters?: Record<string, any>;
    signal?: AbortSignal;
  };
  
  // Props type for the delete function
  type DeleteProps = {
    entity: string;
    ids: number[];
    signal?: AbortSignal;
  };
  
  // Props type for the activate function
  type ActivateProps = {
    entity: string;
    ids: number[];
    signal?: AbortSignal;
  };
  
  // Props type for the inactivate function
  type InactivateProps = {
    entity: string;
    ids: number[];
    signal?: AbortSignal;
  };
  
  // Props type for the restore function
  type RestoreProps = {
    entity: string;
    ids: number[];
    signal?: AbortSignal;
  };
  