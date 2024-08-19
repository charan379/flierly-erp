import mongoose from "mongoose";
import { UserPassword as UserPassword } from '../interfaces/user-password.interface';


const schema: mongoose.Schema<UserPassword> = new mongoose.Schema<UserPassword>(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            required: [true, "UserId is required for storing passwords"],
        },
        password: {
            type: String,
            required: [true, "User password is required."]
        }
    },
    {
        timestamps: true,
        collection: "user-passowrds"
    }
);

schema.index({ userId: 1 });

const UserPasswordModel: mongoose.Model<UserPassword> = mongoose.model<UserPassword>('UserPassword', schema);

export default UserPasswordModel;