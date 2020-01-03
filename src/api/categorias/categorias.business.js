import CategoriasDAO from './categorias.dao';

const categoriasDAO = new CategoriasDAO();

export default class CategoriasBusiness {
    async list({ params }) {
        return categoriasDAO.findAll(params);
    }

    async detail({ params }) {
        const { id } = params;

        return categoriasDAO.findByID(id);
    }

    async create({ payload }) {
        return categoriasDAO.create(payload);
    }

    async update({ params, payload }) {
        const { id } = params;

        return categoriasDAO.update(id, payload);
    }

    async destroy({ params }) {
        const { id } = params;

        return categoriasDAO.destroy(id);
    }
}