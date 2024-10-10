const Room = require('../models/Room');

class RoomRepository {
    async getAllRooms() {
        return await Room.find();
    }
    async getRoomByID(id) {
        return await Room.findById(id);
    }
}

module.exports = new RoomRepository();
