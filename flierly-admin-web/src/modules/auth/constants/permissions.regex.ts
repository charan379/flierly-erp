const permissionRegexMap: Record<string, RegExp> = {
    "product.update": /^product\.update$/,
    "product.create": /^product\.create$/,
    "user.manage": /^user\.(create|update|delete)$/,
};

export default Object.freeze(permissionRegexMap);