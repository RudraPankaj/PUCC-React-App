const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    studentId: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    gender: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['executive','member','instructor'], default: 'member' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);