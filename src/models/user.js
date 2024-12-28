const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Invalid gender value");
            }
        }
    },
    skills: {
        type: [String],
    },
    photoUrl: {
        type: String
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;