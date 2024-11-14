import actionTypes from "./actionType";

const contextHandler = (state, dispatcher) => ({
  reset: () => dispatcher({ type: actionTypes.RESET_STATE }),
  startLoading: () => dispatcher({ type: actionTypes.FETCHING_STARTED }),
  stopLoading: () => dispatcher({ type: actionTypes.FETCHING_COMPLETED }),
  isLoading: () => state.loading,
  pagination: {
    get: () => state.pagination,
    setSize: (size) => dispatcher({type: actionTypes.UPDATE_PAGE_SIZE, payload: size}),
    setTotal: (total) => dispatcher({type: actionTypes.UPDATE_PAGE_TOTAL, payload: total}),
    setCurrent: (current) => dispatcher({type: actionTypes.UPDATE_PAGE_NUMBER, payload: current}),
  },
});

export default contextHandler;
