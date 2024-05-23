import mongoose from "mongoose";
import { User } from "./interfaces/user.interface";


const schema: mongoose.Schema<User> = new mongoose.Schema<User>(
    {
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        username: {
            type: String,
            required: [true, "Username is required."]
        },
        password: {
            type: String,
            required: [true, "User password is required."]
        },
        email: {
            type: String,
            required: [true, "User email is required."]
        },
        mobile: {
            type: String,
            required: [true, "User mobile number is required."]
        },
        permissions: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'Permission', autopopulate: { select: ['name', 'accessType', 'model', 'code'] } }],
            default: []
        },
        excludedPermissions: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'Permission', autopopulate: { select: ['name', 'accessType', 'model', 'code'] } }],
            default: []
        },
        accecesGroups: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'AccessGroup', autopopulate: { select: ['name', 'code'] } }],
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const UserModel: mongoose.Model<User> = mongoose.model<User>('User', schema);

export default UserModel;