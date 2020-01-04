import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
    class Pedido extends Model {}

    Pedido.init({
        valor: dataTypes.DECIMAL
    },
    {
        defaultsScope: {
            attributes: {
                exclude: ['clienteId']
            }
        },
        sequelize,
        modelName: 'pedido',
        tableName: 'pedidos'
    }
    );

    Pedido.associate = models => {
        models.pedido.belongsTo(models.cliente, {
            as: 'cliente',
            foreignKey: 'clienteId'
        });
        models.pedido.belongsToMany(models.produto, {
            foreignKey: 'pedidoId',
            through: models.produtos_pedido,
            as: 'produtos',
            onDelete: 'CASCADE'
        });
    };

    return Pedido;
}