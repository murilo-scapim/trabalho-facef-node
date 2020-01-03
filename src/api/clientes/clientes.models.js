import { Model } from 'sequelize';

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

    return Cliente;
};