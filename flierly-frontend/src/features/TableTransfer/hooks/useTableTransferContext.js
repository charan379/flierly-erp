import { useContext, useMemo } from "react";
import TableTransferContext from "../context/TableTransferContext";
import contextHandler from "../context/contextHandler";

function useTableTransferContext() {
  const context = useContext(TableTransferContext);

  if(context === undefined) {
    throw new Error('useTableTransferContext must be used with a TableTransferContextProvider');
  }

  const [state, dispatch] = context;

  const tableTransferContextHandler = useMemo(() => contextHandler(state, dispatch), [state, dispatch]);

  return { tableTransferContextHandler };
}

export default useTableTransferContext;
