import actionTypes from './actionTypes';

const contextHandler = (state, dispatcher) => ({
    reset: () => dispatcher({ type: actionTypes.RESET_STATE }),
    filters: {
        set: (data) => dispatcher({ type: actionTypes.UPDATE_FILTERS, payload: data }),
        get: () => state?.filters,
    },
    binMode: {
        isActive: () => state?.binMode,
        activate: () => dispatcher({type: actionTypes.ACTIVATE_BIN_MODE}),
        deactivate: () => dispatcher({type: actionTypes.DEACTIVATE_BIN_MODE}),
    },
    rowMenu: {
        open: () => dispatcher({ type: actionTypes.OPEN_ROW_MENU }),
        close: () => dispatcher({ type: actionTypes.CLOSE_ROW_MENU }),
        isOpen: () => state?.rowMenu?.open,
        setPosition: (position = { x: 0, y: 0 }) => dispatcher({ type: actionTypes.UPDATE_ROW_MENU_POSITION, payload: position }),
        getPosition: () => state?.rowMenu?.position,
        setCurrentRecord: (record = {}) => dispatcher({ type: actionTypes.UPDATE_ROW_MENU_CURRENT_RECORD, payload: record }),
        getCurrentRecord: () => state?.rowMenu?.currentRecord,
    },
});

export default contextHandler;
