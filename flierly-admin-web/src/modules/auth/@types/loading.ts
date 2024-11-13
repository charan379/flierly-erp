// src/types/loading.ts

export enum LoadingTypes {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
    REFRESHING= "REFRESHING",
  }
  
  // Type-safe version of LoadingTypes
  export type LoadingState = keyof typeof LoadingTypes;
  