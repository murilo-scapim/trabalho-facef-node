import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
    class ProdutosPedido extends Model {}

    ProdutosPedido = sequelize.define(
        'produtos_pedido',
        {
            quantidade: dataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'produtos_pedido',
            tableName: 'produtos_pedido'
        }
    );

    return ProdutosPedido;
};