import PedidosBusiness from './pedidos.business';
import { CREATED, NO_CONTENT } from 'http-status';

const pedidosBusiness = new PedidosBusiness();

export default class PedidosController {

    async list(request, h) {
        return await pedidosBusiness.list(request);
    }

    async detail(request, h) {
        return await pedidosBusiness.detail(request);
    }

    async create(request, h) {
        const pedido = await pedidosBusiness.create(request);
        return h.response(pedido).code(CREATED);
    }

    async update(request, h) {
        return await pedidosBusiness.update(request);
    }

    async destroy(request, h) {
        await pedidosBusiness.destroy(request);
        return h.response().code(NO_CONTENT);
    }
}