import { ActionTypes } from "./ActionTypes";

// Initial state for the CRUD table context
export const initialState: CrudTableState = {
    rowMenu: {
        open: false,
        position: { x: 0, y: 0 },
        currentRecord: {},
    },
    filters: {}, // Stores applied filters
    binMode: false, // Indicates if bin mode is active
    updateForm: {
        open: false,
        data: {},
        id: 0,
    },
};

// Define the shape of all possible actions
export type Action =
    | { type: ActionTypes.RESET_STATE }
    | { type: ActionTypes.UPDATE_FILTERS; payload: Record<string, any> }
    | { type: ActionTypes.OPEN_UPDATE_FORM; payload: { data: any; id: number } }
    | { type: ActionTypes.CLOSE_UPDATE_FORM }
    | { type: ActionTypes.OPEN_ROW_MENU }
    | { type: ActionTypes.CLOSE_ROW_MENU }
    | { type: ActionTypes.ACTIVATE_BIN_MODE }
    | { type: ActionTypes.DEACTIVATE_BIN_MODE }
    | { type: ActionTypes.UPDATE_ROW_MENU_CURRENT_RECORD; payload: Record<string, any> }
    | { type: ActionTypes.UPDATE_ROW_MENU_POSITION; payload: { x: number; y: number } };

// Reducer function to handle state updates based on dispatched actions
export function reducer(state: CrudTableState, action: Action): CrudTableState {
    switch (action.type) {
        // Reset the entire state to its initial values
        case ActionTypes.RESET_STATE:
            return initialState;

        // Update filters with the provided payload
        case ActionTypes.UPDATE_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };

        // Open or close the update form based on the action type
        case ActionTypes.OPEN_UPDATE_FORM:
        case ActionTypes.CLOSE_UPDATE_FORM:
            return {
                ...state,
                updateForm:
                    action.type === ActionTypes.OPEN_UPDATE_FORM
                        ? {
                              open: true,
                              data: action.payload.data,
                              id: action.payload.id,
                          }
                        : initialState.updateForm, // Reset form if closing
            };

        // Toggle the row menu's open state
        case ActionTypes.OPEN_ROW_MENU:
        case ActionTypes.CLOSE_ROW_MENU:
            return {
                ...state,
                rowMenu: {
                    ...state.rowMenu,
                    open: action.type === ActionTypes.OPEN_ROW_MENU,
                },
            };

        // Activate or deactivate bin mode
        case ActionTypes.ACTIVATE_BIN_MODE:
        case ActionTypes.DEACTIVATE_BIN_MODE:
            return {
                ...state,
                binMode: action.type === ActionTypes.ACTIVATE_BIN_MODE,
            };

        // Update the current record for the row menu
        case ActionTypes.UPDATE_ROW_MENU_CURRENT_RECORD:
            return {
                ...state,
                rowMenu: {
                    ...state.rowMenu,
                    currentRecord: action.payload,
                },
            };

        // Update the position of the row menu
        case ActionTypes.UPDATE_ROW_MENU_POSITION:
            return {
                ...state,
                rowMenu: {
                    ...state.rowMenu,
                    position: action.payload,
                },
            };

        // Handle unknown actions with an explicit error
        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
}
