import { ReactNode, useMemo, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import CrudModuleContext from './CrudModuleContext'
// Assuming this type exists

interface CrudModuleContextProviderProps {
  children: ReactNode
}

function CrudModuleContextProvider({ children }: CrudModuleContextProviderProps): JSX.Element {
  // Reducer hook with proper typing
  const [state, dispatch] = useReducer(reducer, initialState)

  // Memoizing value to prevent unnecessary re-renders
  const value = useMemo<CrudModuleContextType>(() => ({ state, dispatcher: dispatch }), [state])

  return <CrudModuleContext.Provider value={value}>{children}</CrudModuleContext.Provider>
}

export default CrudModuleContextProvider
