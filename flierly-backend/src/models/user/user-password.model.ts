import mongoose from "mongoose";
import { UserPassowrd } from '../interfaces/user-password.interface';


const schema: mongoose.Schema<UserPassowrd> = new mongoose.Schema<UserPassowrd>(
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

const UserPassowrdModel: mongoose.Model<UserPassowrd> = mongoose.model<UserPassowrd>('UserPassword', schema);

export default UserPassowrdModel;