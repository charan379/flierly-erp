import { Privilege } from "@/models/interfaces/privilege.interface";
import UserModel from "@/models/user/user.model";
import mongoose from "mongoose";

/**
 * Generates an aggregation pipeline to retrieve user privileges.
 * 
 * @param {mongoose.Types.ObjectId} userId - The ID of the user.
 * @returns {Array} The aggregation pipeline array.
 */
const getUserPrivilegesPipeline = (userId: mongoose.ObjectId): Array<any> => [
    // Match the user by ID
    { $match: { _id: userId } },
    // Lookup roles assigned to the user
    {
        $lookup: {
            from: 'roles',
            localField: 'roles',
            foreignField: '_id',
            as: 'roles'
        }
    },
    // Lookup privileges associated with each role
    {
        $lookup: {
            from: 'role-privileges',
            localField: 'roles._id',
            foreignField: 'roleId',
            as: 'rolePrivileges'
        }
    },
    // Unwind the rolePrivileges array
    {
        $unwind: {
            path: '$rolePrivileges',
            preserveNullAndEmptyArrays: true
        }
    },
    // Group all privileges from roles
    {
        $group: {
            _id: '$_id',
            rolePrivileges: { $addToSet: '$rolePrivileges.privileges' },
            additionalPrivileges: { $first: '$additionalPrivileges' },
            restrictedPrivileges: { $first: '$restrictedPrivileges' }
        }
    },
    // Flatten the privileges arrays
    {
        $project: {
            allRolePrivileges: {
                $reduce: {
                    input: '$rolePrivileges',
                    initialValue: [],
                    in: { $setUnion: ['$$value', '$$this'] }
                }
            },
            additionalPrivileges: 1,
            restrictedPrivileges: 1
        }
    },
    // Combine role privileges and additional privileges
    {
        $project: {
            combinedPrivileges: { $setUnion: ['$allRolePrivileges', '$additionalPrivileges'] },
            restrictedPrivileges: 1
        }
    },
    // Remove restricted privileges
    {
        $project: {
            finalPrivileges: { $setDifference: ['$combinedPrivileges', '$restrictedPrivileges'] }
        }
    },
    // Lookup privilege details
    {
        $lookup: {
            from: 'privileges',
            localField: 'finalPrivileges',
            foreignField: '_id',
            as: 'privileges'
        }
    },
    // Extract the code fields from final privileges
    {
        $project: {
            privileges: 1,
            privilegeCodes: {
                $map: {
                    input: '$privileges',
                    as: 'privilege',
                    in: '$$privilege.code'
                }
            }
        }
    }
];

/**
 * Retrieves user privileges and privilege codes using the aggregation pipeline.
 * 
 * @param {mongoose.Types.ObjectId} userId - The ID of the user.
 * @returns {Promise<{ privileges: Privilege[], privilegeCodes: string[] }>} A promise that resolves to an object containing arrays of privileges and privilege codes.
 */
export const getUserPrivileges = async (userId: mongoose.ObjectId): Promise<{ privileges: Privilege[], privilegeCodes: Set<string> }> => {
    const userPrivileges = await UserModel.aggregate(getUserPrivilegesPipeline(userId));
    return userPrivileges.length > 0 ? {
        privileges: userPrivileges[0].privileges,
        privilegeCodes: new Set(userPrivileges[0].privilegeCodes)
    } : { privileges: [], privilegeCodes: new Set<string> };
};

export default getUserPrivilegesPipeline;
