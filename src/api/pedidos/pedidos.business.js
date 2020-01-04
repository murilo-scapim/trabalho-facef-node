import PedidosDAO from './pedidos.dao';
import ProdutosDAO from '../produtos/produtos.dao';
import Boom from '@hapi/boom';

const pedidosDAO = new PedidosDAO();
const produtosDAO = new ProdutosDAO();

export default class PedidosBusiness {

    async list({ params }) {
        return pedidosDAO.findAll(params);
    }

    async detail({ params }) {
        const { id } = params;

        return pedidosDAO.findByID(id);
    }

    async create({ payload }) {
        let total = 0;

        const { clienteId, produtos } = payload;

        for (let produto of produtos) {
            let resultProduto = await produtosDAO.findByID(produto.id);
            if (resultProduto.dataValues.quantidade < produto.quantidade) {
                throw Boom.notAcceptable(
                    'Quantidade não disponível!');
            }
            
            resultProduto.dataValues.quantidade -= produto.quantidade;
            await produtosDAO.update(produto.id, resultProduto.dataValues);

            total = parseFloat(total) + (parseFloat(resultProduto.valor) 
                    * parseFloat(produto.quantidade));
        }

        payload.valor = total;
        return pedidosDAO.create(payload);
    }

    async update({ params, payload }) {
        const { id } = params;
        const { clienteId, produtos } = payload;

        if (produtos) {
            for (let produto of produtos) {
                let resultProduto = await produtosDAO.findByID(produto.id);
                if (resultProduto.dataValues.quantidade < produto.quantidade) {
                    throw Boom.notAcceptable(
                        'Quantidade não disponível!');
                }

                resultProduto.dataValues.quantidade -= produto.quantidade;
                await produtosDAO.update(produto.id, resultProduto.dataValues);
            }
        }
        return pedidosDAO.update(id, payload);
    }

    async destroy({ params }) {
        const { id } = params;

        return pedidosDAO.destroy(id);
    }
}