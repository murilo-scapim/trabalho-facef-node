import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

const Pedido = instances.getModel('pedido');
const Produto = instances.getModel('produto');

export default class PedidosDAO {

    async findAll(params) {
        return Pedido.findAll({
            where: params,
            include: [
                'cliente',
                {
                    model: Produto,
                    as: 'produtos',
                    through: { 
                        attributes: ['quantidade'] 
                    },
                    attributes: ['id', 'descricao', 'valor']
                }
            ]
        });
    }

    async findByID(id) {
        return await getObjectOr404(Pedido, {
            where: { id },
            include: [
                'cliente',
                {
                    model: Produto,
                    as: 'produtos',
                    through: {
                        attributes: ['quantidade']
                    },
                    attributes: ['id', 'descricao', 'valor']
                }
            ]
        });
    }

    async create(data) {
        const { produtos } = data;
        const pedido = await Pedido.create(data);

        if (produtos) {
            for (const produto of produtos) {
                const { id, quantidade } = produto;
                await pedido.addProdutos(id, {
                    through: {
                        quantidade: quantidade
                    }
                });
            }
        }
        return await this.findByID(pedido.id);
    }

    async update (id, data) {
        const pedido = await this.findByID(id);
        return await pedido.update(data);
    }

    async destroy(id) {
        const pedido = await this.findByID(id);
        return await pedido.destroy(pedido);
    }
}