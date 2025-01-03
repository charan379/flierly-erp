import validationsRegex from "@/constants/validations.regex";

const getValidationRegex = (key: string): RegExp => validationsRegex[key] || /.*/;

export default getValidationRegex;
