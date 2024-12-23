import { QueryCondition } from "@/features/QueryBuilder/QueryBuilder";
import { ActionTypes } from "./action-types.enum";

// Initial state for the CRUD table context
export const initialState: CrudModuleState = {
    rowMenu: {
        open: false,
        position: { x: 0, y: 0 },
        currentRecord: {},
    },
    conditions: [], // Stores query conditions
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
    | { type: ActionTypes.RESET_FILTERS }
    | { type: ActionTypes.OPEN_UPDATE_FORM; payload: { data: any; id: number } }
    | { type: ActionTypes.CLOSE_UPDATE_FORM }
    | { type: ActionTypes.OPEN_ROW_MENU }
    | { type: ActionTypes.CLOSE_ROW_MENU }
    | { type: ActionTypes.ACTIVATE_BIN_MODE }
    | { type: ActionTypes.DEACTIVATE_BIN_MODE }
    | { type: ActionTypes.UPDATE_ROW_MENU_CURRENT_RECORD; payload: Record<string, any> }
    | { type: ActionTypes.UPDATE_ROW_MENU_POSITION; payload: { x: number; y: number } }
    | { type: ActionTypes.UPDATE_QUERY_CONDITIONS; payload: QueryCondition[] };

// Reducer function to handle state updates based on dispatched actions
export function reducer(state: CrudModuleState, action: Action): CrudModuleState {
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
        case ActionTypes.RESET_FILTERS:
            return {
                ...state,
                filters: initialState.filters
            }
        // Open or close the update form based on the action type
        case ActionTypes.OPEN_UPDATE_FORM:
            return {
                ...state,
                updateForm: {
                    open: true,
                    data: action.payload.data,
                    id: action.payload.id,
                }
            };
        case ActionTypes.CLOSE_UPDATE_FORM:
            return {
                ...state,
                updateForm: initialState.updateForm, // Reset form if closing
            };
        // Toggle the row menu's open state
        case ActionTypes.OPEN_ROW_MENU:
            return {
                ...state,
                rowMenu: {
                    ...state.rowMenu,
                    open: true,
                },
            };
        case ActionTypes.CLOSE_ROW_MENU:
            return {
                ...state,
                rowMenu: {
                    ...state.rowMenu,
                    open: false,
                },
            };
        // Activate or deactivate bin mode
        case ActionTypes.ACTIVATE_BIN_MODE:
            return {
                ...state,
                binMode: true,
            };
        case ActionTypes.DEACTIVATE_BIN_MODE:
            return {
                ...state,
                binMode: false,
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
        // Update the query conditions
        case ActionTypes.UPDATE_QUERY_CONDITIONS:
            return {
                ...state,
                conditions: action.payload,
            };
        // Handle unknown actions with an explicit error
        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
}
