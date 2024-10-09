const mongoose = require('mongoose');
const { v4: uuid } = require('uuidv4');

const roomSchema = new mongoose.Schema({
    _id: uuid(),
    name: { type: String, required: true, unique: true },
    description: String,
    capacity: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = new mongoose.model('Room', roomSchema);
