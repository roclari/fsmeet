const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
require('dotenv').config();

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserRepository.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Cadastro criado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar o cadastro.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        const token = jwt.sign({ id: UserRepository.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};
