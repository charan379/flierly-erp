import { useContext, useMemo } from 'react'
import CrudModuleContext from '../../context/CrudModuleContext'
import crudModuleContextHandler from '../../context/crud-module-context-handler'

// Custom hook to handle context state and dispatch actions in the CrudModuleContext
function useCrudModuleContext() {
  // Retrieve context value (state and dispatch) from the CrudModuleContext
  const context = useContext(CrudModuleContext)

  // Throw an error if the hook is used outside of a CrudModuleContextProvider
  if (context.dispatcher === undefined) {
    throw new Error(
      'useCrudModuleContext must be used within a CrudModuleContextProvider.\nIn case your accessing useCrudModuleContext in CrudTable component then either wrap CrudTable under CrudModule or explicitly wrap CrudTable under CrudModuleContextProvider.',
    )
  }

  // Destructure the context into state and dispatch
  const { state, dispatcher } = context

  // Use useMemo to create a stable handler that will only be recalculated if state or dispatch changes
  const CrudModuleContextHandler = useMemo(() => crudModuleContextHandler(state, dispatcher), [state, dispatcher])

  // Return the handler which contains functions for interacting with context state
  return { CrudModuleContextHandler }
}

export default useCrudModuleContext
