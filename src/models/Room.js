const mongoose = require('mongoose');
const { uuidv4 } = require('uuid');

const RoomSchema = new mongoose.Schema({
    _id: uuidv4(),
    name: { type: String, required: true, unique: true },
    description: String,
    capacity: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = new mongoose.model('Room', RoomSchema);
