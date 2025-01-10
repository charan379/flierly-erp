export interface AssociatedEntityRecordsPageRequestBody extends PaginationRequest {
    entityRecordId: number;
    entity: string;
    entitySideField: string;
    associatedSideField: string;
    withDeleted: boolean;
    type: 'allocated' | 'unallocated';
};

export interface EntityRecordsPageRequestBody extends PaginationRequest {
    loadRelations: string[];
    withDeleted: boolean;
};

export interface IsEntityRecordExistsRequestBody {
    filters: FilterObject;
    withDeleted: boolean;
};

export interface EntityReadRequestBody {
    loadRelations: string[];
    id: number;
};

export interface SearchEntityRecordsRequestBody {
    filters: FilterObject;
    limit: number
}

export interface UpdateAssociatedEntityRecordsRequestBody {
    entityRecordId: number;
    entitySideField: string;
    newArray?: number[];
    addOne?: number;
    removeOne?: number;
    addMultiple?: number[];
    removeMultiple?: number[];
}

export interface PaginationRequest {
    page: number;
    limit: number
    sort: SortObject;
    filters: FilterObject;
};