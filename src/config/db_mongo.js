const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_URI)

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            
        });
        console.log('MongoDB conectado.');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados do Mongo: ', err.message);
        process.exit(1);
    }
};

module.exports = connectMongo;
