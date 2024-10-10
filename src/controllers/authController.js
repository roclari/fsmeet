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
        res.status(400).json({ error: 'Erro ao criar o cadastro.' });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await UserRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await UserRepository.update(req.body, { where: { id } });
        if (updated) {
            const updatedUser = await UserRepository.findOne({ where: { id } });
            return res.status(200).json(updatedUser);
        }
        throw new Error('Usuário não encontrado');
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar o cadastro.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserRepository.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ message: 'Usuário deletado com sucesso' });
        }
        throw new Error('Usuário não encontrado');
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }
};
