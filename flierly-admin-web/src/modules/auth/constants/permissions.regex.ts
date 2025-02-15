const permissionRegexMap = {
    "*": /.*/,
    // product
    "product.*": /^product\.[a-z]+$/,
    "product.update": /^product\.update$/,
    "product.create": /^product\.create$/,
    "product.manage": /^product\.manage$/,
    // productCategory
    "productCategory.*": /^product-category\.[a-z]+$/,
    "productCategory.update": /^product-category\.update+$/,
    "productCategory.create": /^product-category\.create$/,
    // productSubCategory
    "productSubCategory.*": /^product-sub-category\.[a-z]+$/,
    "productSubCategory.create": /^product-sub-category\.create$/,
    "productSubCategory.update": /^product-sub-category\.update$/,
    // productStock
    "productStock.*": /^product-stock\.[a-z]+$/,
    // account
    "account.*": /^account(-[a-z]+)?\.[a-z]+$/,
    // accountType
    "accountType.*": /^account-type\.[a-z]+$/,
    // accountSubtype
    "accountSubtype.*": /^account-subtype\.[a-z]+$/,
    // address
    "address.*": /^address\.[a-z]+$/,
    // inventory
    "inventory.*": /^inventory\.[a-z]+$/,
    // uom
    "uom.*": /^uom\.[a-z]+$/,
    "uom.update": /^uom\.update$/,
    "uom.create": /^uom\.create$/,
    // uomConverstions
    "uomConversion.*": /^uom-conversion\.[a-z]+$/,
    // tagsMetadata
    "tagMetadata.*": /^tag-metadata\.[a-z]+$/,
    "tagMetadata.update": /^tag-metadata\.update$/,
    "tagMetadata.create": /^tag-metadata\.create$/,
    "tagMetadata.manage": /^tag-metadata\.manage$/,
    // brand
    "brand.*": /^brand\.[a-z]+$/,
    "brand.update": /^brand\.update+$/,
    "brand.create": /^brand\.create+$/,
    // taxIdentity
    "taxIdentity.*": /^tax-identity\.[a-z]+$/,
    // iam
    "iam": /^(user|privilege|role)\.[a-z]+$/,
    // user
    "user.*": /^user\.[a-z]+$/,
    "user.manage": /^user\.(create|update|delete)$/,
    // role
    "role.*": /^role\.[a-z]+$/,
    // privilege
    "privilege.*": /^privilege\.[a-z]+$/,


} satisfies { [key: string]: RegExp };

export default permissionRegexMap;