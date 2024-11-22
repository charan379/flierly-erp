import { useContext, useMemo } from 'react';
import CrudTableContext from '../../context/CrudTableContext';
import contextHandler from '../../context/contextHandler';

// Custom hook to handle context state and dispatch actions in the CrudTableContext
function useCrudTableContext() {
    // Retrieve context value (state and dispatch) from the CrudTableContext
    const context = useContext(CrudTableContext);

    // Throw an error if the hook is used outside of a CrudTableContextProvider
    if (context === undefined) {
        throw new Error('useCrudTableContext must be used within a CrudTableContextProvider');
    }

    // Destructure the context into state and dispatch
    const [state, dispatch] = context;

    // Use useMemo to create a stable handler that will only be recalculated if state or dispatch changes
    const crudTableContextHandler = useMemo(() => contextHandler(state, dispatch), [state, dispatch]);

    // Return the handler which contains functions for interacting with context state
    return { crudTableContextHandler };
}

export default useCrudTableContext;
