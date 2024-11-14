import { useMemo, useReducer } from "react";
import { initialState, reducer } from "../../context/reducer";
import TableTransferContext from "../../context/TableTransferContext";

function TableTransferContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <TableTransferContext.Provider value={value}>
      {children}
    </TableTransferContext.Provider>
  );
}

export default TableTransferContextProvider;
