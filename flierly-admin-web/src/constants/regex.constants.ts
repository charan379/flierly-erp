const regexConstants = {
    username: /^[a-z0-9_]+$/,
    password: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,26})$/,
    mobile: /^\+\d{1,3}[\s][6-9]\d{9}$/,
    code: /^[a-z-]+\.[a-z-]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    sku: /^[A-Z0-9_-]{3,50}$/
};

export default Object.freeze(regexConstants);