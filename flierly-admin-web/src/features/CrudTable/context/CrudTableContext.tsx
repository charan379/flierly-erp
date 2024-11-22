import { createContext } from 'react';
import { Action, initialState } from './reducer';

// Create a placeholder dispatch function to satisfy the type requirement
const placeholderDispatch: React.Dispatch<Action> = () => {
  throw new Error("Dispatch function must be overridden in CrudTableContextProvider.");
};

// Create the context with a default value as a tuple of initialState and the placeholder dispatch
const CrudTableContext = createContext<[CrudTableState, React.Dispatch<Action>]>([
  initialState,
  placeholderDispatch,
]);

export default CrudTableContext;
