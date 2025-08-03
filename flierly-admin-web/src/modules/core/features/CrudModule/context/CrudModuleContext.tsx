import { createContext } from 'react'
import { initialState } from './reducer'

// Create the context with a default value as a tuple of initialState and the placeholder dispatch
const CrudModuleContext = createContext<CrudModuleContextType>({ state: initialState })

export default CrudModuleContext
