import mongoose from "mongoose";
import { User } from "../interfaces/user.interface";


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
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "User email is required."]
        },
        mobile: {
            type: String,
            required: [true, "User mobile number is required."]
        },
        additionalPrivileges: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'Privilege', autopopulate: { select: ['name', 'access', 'model', 'code'] } }],
            default: []
        },
        restrictedPrivileges: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'Privilege', autopopulate: { select: ['name', 'access', 'model', 'code'] } }],
            default: []
        },
        roles: {
            type: [{ type: mongoose.Schema.ObjectId, ref: 'Role', autopopulate: { select: ['name', 'code', 'description'] } }],
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

schema.index({ username: 1 });
schema.index({ email: 1 });
schema.index({ mobile: 1 })

schema.plugin(require('mongoose-autopopulate'));

const UserModel: mongoose.Model<User> = mongoose.model<User>('User', schema);

export default UserModel;