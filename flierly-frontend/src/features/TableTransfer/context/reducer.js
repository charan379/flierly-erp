import actionTypes from "./actionType";

export const initialState = {
  loading: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return initialState;
    case actionTypes.FETCHING_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCHING_COMPLETED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.UPDATE_PAGE_NUMBER:
      return {
        ...state,
        pagination: { ...state.pagination, current: action.payload },
      };
    case actionTypes.UPDATE_PAGE_SIZE:
      return {
        ...state,
        pagination: { ...state.pagination, pageSize: action.payload },
      };
    case actionTypes.UPDATE_PAGE_TOTAL:
      return {
        ...state,
        pagination: { ...state.pagination, total: action.payload },
      };
    default:
      throw new Error(
        `Unhandled table transfer context action type: ${action.type}`
      );
  }
}
