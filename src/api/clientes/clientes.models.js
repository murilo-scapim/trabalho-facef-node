import { Model } from 'sequelize';
import Bcrypt from 'bcryptjs';

export default (sequelize, dataTypes) => {
    class Cliente extends Model {};

    Cliente.init({
        nome: dataTypes.STRING,
        numeroCpfCnpj: {
            type: dataTypes.STRING,
            unique: true
        },
        email: {
            type: dataTypes.STRING,
            unique: true
        },
        senha: dataTypes.STRING
    }, { sequelize, modelName: 'cliente', tableName: 'clientes' });

    Cliente.addHook('beforeCreate', async (cliente) => {
        const hash = await Bcrypt.hash(cliente.senha, 10);
        cliente.senha = hash;
    });

    return Cliente;
};