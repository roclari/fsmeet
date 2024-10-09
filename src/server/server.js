const express = require('express');
const sequelize = require('./models');
const connectMongo = require('./config/db_mongo');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());

connectMongo();

app.use('/auth', authRoutes);

sequelize.sync()
    .then(() => console.log('Banco de dados sincronizado.'))
    .catch(err => console.log('Erro ao sincronizar banco de dados: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server rodando na Porta ${PORT}`);
});
