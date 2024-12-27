const regexConstants: Record<string, RegExp> = {
    username: /^[a-z0-9_]+$/,
    password: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,26})$/,
    mobile: /^\+\d{1,3}[\s][6-9]\d{9}$/,
    privilegeCode: /^[a-z-]+\.[a-z-]+$/,
    roleCode: /^[a-z]+-[a-z0-9]+$/,
    sku: /^[A-Z0-9_-]{3,50}$/
};

export default Object.freeze(regexConstants);