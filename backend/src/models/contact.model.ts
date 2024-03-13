import mongoose from "mongoose";
import { Contact } from "./interfaces/contact.interface";

const schema: mongoose.Schema<Contact> = new mongoose.Schema<Contact>(
    {
        isDeleted: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            required: [true, "Contact name is required."]
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: [true, "Contact phone is required."]
        },
        alternatePhone: {
            type: String,
        },
        branchId: {
            type: mongoose.Schema.ObjectId
        },
        accountId: {
            type: mongoose.Schema.ObjectId
        }
    },
    {
        timestamps: true,
        collection: "contacts"
    }
);

const ContactModel: mongoose.Model<Contact> = mongoose.model<Contact>('Contact', schema);

export default ContactModel;