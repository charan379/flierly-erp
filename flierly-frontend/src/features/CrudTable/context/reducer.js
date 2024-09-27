import actionTypes from "./actionTypes";

export const initialState = {
  rowMenu: { open: false, position: { x: 0, y: 0 }, currentRecord: {} },
  filters: {},
  binMode: false,
  updateForm: {
    open: false, data: {}, id: null
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return initialState;
    case actionTypes.OPEN_UPDATE_FROM:
      return {
        ...state,
        updateForm: { open: true, data: action.payload.data, id: action.payload.id }
      }
    case actionTypes.CLOSE_UPDATE_FROM:
      return {
        ...state,
        updateForm: initialState.updateForm
      }
    case actionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case actionTypes.CLOSE_ROW_MENU:
      return {
        ...state,
        rowMenu: { ...state.rowMenu, open: false },
      };
    case actionTypes.OPEN_ROW_MENU:
      return {
        ...state,
        rowMenu: { ...state.rowMenu, open: true },
      };
    case actionTypes.ACTIVATE_BIN_MODE:
      return {
        ...state,
        binMode: true,
      };
    case actionTypes.DEACTIVATE_BIN_MODE:
      return {
        ...state,
        binMode: false,
      };
    case actionTypes.UPDATE_ROW_MENU_CURRENT_RECORD:
      return {
        ...state,
        rowMenu: { ...state.rowMenu, currentRecord: action.payload },
      };
    case actionTypes.UPDATE_ROW_MENU_POSITION:
      return {
        ...state,
        rowMenu: { ...state.rowMenu, position: action.payload },
      };
    default:
      throw new Error(
        `Unhandled Crud table context action type: ${action.type}`
      );
  }
}
