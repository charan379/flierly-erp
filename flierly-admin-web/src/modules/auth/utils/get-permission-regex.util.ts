import permissionsRegex from "../constants/permissions.regex";

const getPermissionRegex = (key: string): RegExp => permissionsRegex[key] || /.*/;

export default getPermissionRegex;
