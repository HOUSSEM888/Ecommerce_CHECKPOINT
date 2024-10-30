const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetCode: {
        type: String, // Optional: for password reset
        required: false,
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "productVariant",
        required: false,
    },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('User', userSchema);
