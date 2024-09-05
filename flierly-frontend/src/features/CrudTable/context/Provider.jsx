import { useMemo, useReducer } from "react";
import CrudTableContext from ".";
import { initialState, reducer } from "./reducer";

function CrudTableContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [state, dispatch], [state]);

    return (
        <CrudTableContext.Provider value={value}>
            {children}
        </CrudTableContext.Provider>
    )

}

export default CrudTableContextProvider;