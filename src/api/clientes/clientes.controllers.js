import ClientesBusiness from './clientes.business';
import { CREATED, NO_CONTENT } from 'http-status';

const clientesBusiness = new ClientesBusiness();

export default class ClientesController {

    async list(request, h) {
        return await clientesBusiness.list(request);
    }

    async detail(request, h) {
        return await clientesBusiness.detail(request);
    }

    async create(request, h) {
        const cliente = await clientesBusiness.create(request);

        return h.response(cliente).code(CREATED);
    }

    async update(request, h) {
        return await clientesBusiness.update(request);
    }

    async destroy(request, h) {
        await clientesBusiness.destroy(request);

        return h.response().code(NO_CONTENT);
    }
}