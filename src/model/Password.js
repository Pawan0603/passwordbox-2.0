import mongoose, { Schema } from "mongoose";

const PasswordSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, "User ID is required" ]
    },
    userEmail: {
        type: String,
        required: [ true, "User email is required" ]
    },
    title: {
        type: String,
        required: [true, "Heading is required"]
    },
    webUrl: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: [true, "Identifier is required"]
    }, // Username ya Email
    Password: {
        type: String,
        required: [true, "Password is required"]
    }, // Encrypted string
    Description: {
        type: String
    },
    isFavorite: { type: Boolean, default: false }
}, { timestamps: true });

const PasswordModel = mongoose.models.Password || mongoose.model("Password", PasswordSchema)

export default PasswordModel;