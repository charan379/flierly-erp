import actionTypes from './actionTypes';

export const initialState = {
    rowMenu: { open: false, position: { x: 0, y: 0 }, currentRecord: {} },
    filters: {},
};

export function reducer(state, action) {
    switch (action.type) {
        case actionTypes.RESET_STATE:
            return initialState;
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
            throw new Error(`Unhandled Crud table context action type: ${action.type}`);
    }
}
