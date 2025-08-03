import { ReactNode, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import CrudModuleContext from './CrudModuleContext'
// Assuming this type exists

interface CrudModuleContextProviderProps {
  children: ReactNode
}

function CrudModuleContextProvider({ children }: CrudModuleContextProviderProps): JSX.Element {
  // Reducer hook with proper typing
  const [state, dispatch] = useReducer(reducer, initialState)

  return <CrudModuleContext.Provider value={{ state, dispatcher: dispatch }}>{children}</CrudModuleContext.Provider>
}

export default CrudModuleContextProvider
