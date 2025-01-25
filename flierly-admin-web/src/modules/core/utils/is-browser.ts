/**
 * Constant to check if the current environment is a browser.
 * This is done by verifying that `window` and `window.document` are defined,
 * and that `window.document.createElement` is a function.
 *
 * @returns {boolean} True if running in a browser environment, otherwise false.
 */
const isBrowser: boolean = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement === 'function'

// Exporting for use in other parts of the application.
export default isBrowser
