const RoomRepository = require('../repositories/RoomRepository');

exports.create = async (req, res) => {
    const { name, description, capacity } = req.body;
    try {
        await room.create({ name, description, capacity });
        res.status(201).json({ message: 'Sala criada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar a sala.' });
        res.status(400).json({ error: 'Erro ao criar a sala.' });
    }
};

exports.get = async (req, res) => {
    try {
        const rooms = await RoomRepository.getAllRooms()
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao encontrar as salas.' });
        res.status(400).json({ error: 'Erro ao encontrar as salas.' });
    }
};

exports.join = async (req, res) => {
    const { _id } = req.params;
    try {
        const room = await RoomRepository.findRoomById(_id);
        if (!room) return res.status(404).send('Sala não encontrada.');
        res.status(200).send('O usuário entrou na sala.');
    } catch (err) {
        res.status(500).send('Erro ao entrar na sala.');
        res.status(400).send('Erro ao entrar na sala.');
    }
}
