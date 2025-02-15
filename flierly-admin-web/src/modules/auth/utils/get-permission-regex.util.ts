import permissionsRegex from "../constants/permissions.regex";

const getPermissionRegex = (key: keyof typeof permissionsRegex): RegExp => permissionsRegex[key] || /.*/;

export default getPermissionRegex;
