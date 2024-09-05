import React, { useMemo, useReducer } from 'react';
import { initialState, reducer } from '../../context/reducer';
import CrudTableContext from '../../context/CrudTableContext';


function CrudTableContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [state, dispatch], [state]);

    return (
        <CrudTableContext.Provider value={value}>
            {children}
        </CrudTableContext.Provider>
    );
}

export default CrudTableContextProvider;
