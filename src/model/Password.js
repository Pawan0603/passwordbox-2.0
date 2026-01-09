const VaultSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Yeh User model se link hai
        required: true
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
    title: {
        type: String,
        required: [true, "Heading is required"]
    },
    Description: {
        type: String
    },
    isFavorite: { type: Boolean, default: false }
}, { timestamps: true });