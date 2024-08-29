// import { User } from "@/models/interfaces/user.interface";

// function collectUserPermissions(user: User): Set<string> {
//     const permissions: Set<string> = new Set<string>();

//     // Process user permissions
//     for (const permission of user.permissions) {
//         if ('code' in permission) {
//             permissions.add(permission.code);
//         }
//     }

//     // Process role permissions
//     for (const role of user.roles) {
//         if ('permissions' in role) {
//             for (const permission of role.permissions) {
//                 if ('code' in permission) {
//                     permissions.add(permission.code);
//                 }
//             }
//         }
//     }

//     // Exclude permissions
//     for (const excludedPermission of user.excludedPermissions) {
//         if ('code' in excludedPermission) {
//             permissions.delete(excludedPermission.code);
//         }
//     }

//     return permissions;
// }

// export default collectUserPermissions;
