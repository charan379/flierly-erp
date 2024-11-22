import React, { ReactNode, useMemo, useReducer } from "react";
import { Action, initialState, reducer } from "./reducer";
import CrudTableContext from "./CrudTableContext";
// Assuming this type exists

interface CrudTableContextProviderProps {
  children: ReactNode;
}

function CrudTableContextProvider({ children }: CrudTableContextProviderProps): JSX.Element {
  // Reducer hook with proper typing
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoizing value to prevent unnecessary re-renders
  const value = useMemo<[CrudTableState, React.Dispatch<Action>]>(
    () => [state, dispatch],
    [state]
  );

  return (
    <CrudTableContext.Provider value={value}>
      {children}
    </CrudTableContext.Provider>
  );
}

export default CrudTableContextProvider;
