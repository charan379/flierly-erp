import actionTypes from "./actionTypes";

const contextHandler = (state, dispatcher) => {
    return {
        filters: {
            set: (data) => {
                dispatcher({ type: actionTypes.UPDATE_FILTERS, payload: data })
            },
            get: () => {
                return state?.filters;
            }
        },
        rowMenu: {
            open: () => {
                dispatcher({ type: actionTypes.OPEN_ROW_MENU })
            },
            close: () => {
                dispatcher({ type: actionTypes.CLOSE_ROW_MENU })
            },
            isOpen: () => {
                return state?.rowMenu?.open
            },
            setPosition: (position = { x: 0, y: 0 }) => {
                dispatcher({ type: actionTypes.UPDATE_ROW_MEUN_POSITION, payload: position })
            },
            getPosition: () => {
                return state?.rowMenu?.position
            },
            setCurrentRecord: (record = {}) => {
                dispatcher({ type: actionTypes.UPDATE_ROW_MENU_CURRENT_RECORD, payload: record })
            },
            getCurrentRecord: () => {
                return state?.rowMenu?.currentRecord
            }
        }
    }
}

export default contextHandler;