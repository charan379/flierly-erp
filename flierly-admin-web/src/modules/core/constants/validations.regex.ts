const validationRegex: Record<string, RegExp> = {
    username: /^[a-z0-9_]+$/,
    password: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,26})$/,
    mobile: /^\+\d{1,3}[\s][6-9]\d{9}$/,
    code: /^[a-z-]+\.[a-z-]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "product.sku": /^[A-Z0-9_-]{3,50}$/,
    "record.name": /^[a-zA-Z0-9][a-zA-Z0-9 _.-]{2,97}[a-zA-Z0-9]$/,
    "uom.shortName": /^[a-zA-Z0-9]{1,10}$/,
    "product.hsn": /^\d{4}(\d{2})?(\d{2})?$/,
    "record.description": /^[a-zA-Z0-9](?:[a-zA-Z0-9 \n.,+\-()&:;/!|[\]?@#$%^*_~]{1,498}[a-zA-Z0-9.!])?$/,
};

export default Object.freeze(validationRegex);