// This constant `isBrowser` is used to check if the current environment is a browser.
// It does this by checking if `window` and `window.document` are defined, 
// and if a new HTML element can be created using `window.document.createElement`.
// If all these conditions are true, then the code is running in a browser environment.
const isBrowser = !!(
    typeof window !== 'undefined' &&  // Checks if `window` is defined
    window.document &&                // Checks if `window.document` is defined
    window.document.createElement     // Checks if an HTML element can be created
);

// The result is then exported for use in other parts of the application.
export default isBrowser;