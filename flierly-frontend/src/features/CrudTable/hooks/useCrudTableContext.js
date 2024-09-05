import { useContext } from "react";
import CrudTableContext from "../context";
import contextHandler from "../context/contextHandler";

function useCrudTableContext() {

    const context = useContext(CrudTableContext);

    console.log(context)
    if (context === undefined) {
        throw new Error('useCrudTableContext must be used within a CrudTableContextProvider');
    };

    const [state, dispatch] = context;

    const crudTableContextHandler = contextHandler(state, dispatch)

    return { crudTableContextHandler };
};

export default useCrudTableContext;