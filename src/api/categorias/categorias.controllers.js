import CategoriasBusiness from './categorias.business';
import { CREATED, NO_CONTENT } from 'http-status';

const categoriasBusiness = new CategoriasBusiness();

export default class CategoriasController {

    async list(request, h) {
        return await categoriasBusiness.list(request);
    }


    async detail(request, h) {
        return await categoriasBusiness.detail(request);
    }

    async create(request, h) {
        const categoria = await categoriasBusiness.create(request);

        return h.response(categoria).code(CREATED);
    }

    async update(request, h) {
        return await categoriasBusiness.update(request);
    }

    async destroy(request, h) {
        await categoriasBusiness.destroy(request);

        return h.response().code(NO_CONTENT);
    }
}