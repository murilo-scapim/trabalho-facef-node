import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../../api/utils/database.utils';

const Categoria = instances.getModel('categoria');

export default class CategoriaDAO {

    async findAll(params) {
        return Categoria.findAll({
            where: params
        });
    }

    async find(where) {
        return Categoria.findOne({ where });
    }

    async findByID(id) {
        return await getObjectOr404(Categoria, {
            where: { id }
        });
    }

    async create(data) {
        return Categoria.create(data);
    }

    async update(id, data) {
        const categoria = await this.findByID(id);

        return categoria.update(data);
    }

    async destroy(id) {
        const categoria = await this.findByID(id);

        return categoria.destroy();
    }
};