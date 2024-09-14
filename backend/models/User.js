const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
    },
    email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    },
    password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password length should be 6 character long"],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);
