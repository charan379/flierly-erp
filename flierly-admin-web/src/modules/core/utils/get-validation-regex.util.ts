import validationsRegex from "@/modules/core/constants/validations.regex";

const getValidationRegex = (key: keyof typeof validationsRegex): RegExp => validationsRegex[key] || /.*/;

export default getValidationRegex;
