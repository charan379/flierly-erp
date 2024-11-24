import { ActionTypes } from "./ActionTypes";
import { Dispatch } from "react";
import { Action } from "./reducer";

/**
 * Creates a handler for managing CRUD table state and dispatcher actions.
 * Provides utility methods for interacting with various aspects of the state.
 *
 * @param state - Current state of the CRUD table.
 * @param dispatcher - Function to dispatch actions to the reducer.
 * @returns Object containing utility methods for state management.
 */
const contextHandler = (state: CrudTableState, dispatcher: Dispatch<Action>) => ({
    /** Resets the state to its initial value */
    reset: () => dispatcher({ type: ActionTypes.RESET_STATE }),

    /** Handlers for managing filters */
    filters: {
        /**
         * Updates the filters in the state.
         * @param data - New filter data to set.
         */
        set: (data: Record<string, any>) =>
            dispatcher({ type: ActionTypes.UPDATE_FILTERS, payload: data }),

        /**
         * Reset the filters to initial state
         * 
         */
        reset: () => dispatcher({ type: ActionTypes.RESET_FILTERS }),

        /**
         * Retrieves the current filter data from the state.
         * @returns The current filter data.
         */
        get: () => state.filters,
    },

    /** Handlers for managing bin mode */
    binMode: {
        /**
         * Checks if bin mode is currently active.
         * @returns True if bin mode is active, otherwise false.
         */
        isActive: () => state.binMode,

        /** Activates bin mode */
        activate: () => dispatcher({ type: ActionTypes.ACTIVATE_BIN_MODE }),

        /** Deactivates bin mode */
        deactivate: () => dispatcher({ type: ActionTypes.DEACTIVATE_BIN_MODE }),
    },

    /** Handlers for managing the row menu */
    rowMenu: {
        /** Opens the row menu */
        open: () => dispatcher({ type: ActionTypes.OPEN_ROW_MENU }),

        /** Closes the row menu */
        close: () => dispatcher({ type: ActionTypes.CLOSE_ROW_MENU }),

        /**
         * Checks if the row menu is currently open.
         * @returns True if the row menu is open, otherwise false.
         */
        isOpen: () => state.rowMenu.open,

        /**
         * Sets the position of the row menu.
         * @param position - Coordinates to set as the menu position (x, y).
         */
        setPosition: (position: { x: number; y: number }) =>
            dispatcher({
                type: ActionTypes.UPDATE_ROW_MENU_POSITION,
                payload: position,
            }),

        /**
         * Retrieves the current position of the row menu.
         * @returns The current position of the row menu (x, y).
         */
        getPosition: () => state.rowMenu.position,

        /**
         * Sets the current record for the row menu.
         * @param record - The record data to associate with the row menu.
         */
        setCurrentRecord: (record: Record<string, any>) =>
            dispatcher({
                type: ActionTypes.UPDATE_ROW_MENU_CURRENT_RECORD,
                payload: record,
            }),

        /**
         * Retrieves the current record associated with the row menu.
         * @returns The current record data.
         */
        getCurrentRecord: () => state.rowMenu.currentRecord,
    },

    /** Handlers for managing the update form */
    updateForm: {
        /**
         * Opens the update form with the specified data and ID.
         * @param data - The data and ID to associate with the update form.
         */
        open: (data: { data: Record<string, any>; id: number }) =>
            dispatcher({
                type: ActionTypes.OPEN_UPDATE_FORM,
                payload: data,
            }),

        /** Closes the update form */
        close: () => dispatcher({ type: ActionTypes.CLOSE_UPDATE_FORM }),

        /**
         * Retrieves the data currently associated with the update form.
         * @returns The current update form data.
         */
        getData: () => state.updateForm.data,

        /**
         * Retrieves the ID currently associated with the update form.
         * @returns The current update form ID.
         */
        getId: () => state.updateForm.id,

        /**
         * Checks if the update form is currently open.
         * @returns True if the update form is open, otherwise false.
         */
        isOpen: () => state.updateForm.open,
    },
});

export default contextHandler;
