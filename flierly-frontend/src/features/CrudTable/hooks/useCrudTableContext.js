import { useContext, useMemo } from 'react';
import CrudTableContext from '../context/CrudTableContext';
import contextHandler from '../context/contextHandler';

function useCrudTableContext() {
    const context = useContext(CrudTableContext);

    if (context === undefined) {
        throw new Error('useCrudTableContext must be used within a CrudTableContextProvider');
    }

    const [state, dispatch] = context;

    const crudTableContextHandler = useMemo(() => contextHandler(state, dispatch), [state, dispatch]);

    return { crudTableContextHandler };
}

export default useCrudTableContext;
