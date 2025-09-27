const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    profileimgurl: { type: String, default: 'https://static.vecteezy.com/system/resources/previews/024/183/513/original/male-avatar-portrait-of-a-young-brunette-male-illustration-of-male-character-in-modern-color-style-vector.jpg' },
    studentId: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    gender: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['executive','member','instructor'], default: 'member' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);