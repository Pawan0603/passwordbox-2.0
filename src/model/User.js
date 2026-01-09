import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: [true, "name is required"]
    },
    email: { 
        type: String, 
        unique: true, 
        required: [true, "Email name is required"], 
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "plese use a valid email address"]
    },
    password: { 
        type: String, 
        required: [true, "Password  is required"] 
    },
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)

export default UserModel;