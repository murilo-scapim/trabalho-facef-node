import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';
import Sequelize from 'sequelize';

const Produto = instances.getModel('produto');
const op = Sequelize.Op;

export default class ProdutosDAO {

    async findAll(params) {
        if (params.descricao) {
            params.descricao = { [op.like]: `%s{params.descricao}%`};
        }
        return Produto.findAll({ params, include: [ 'categoria' ] });
    }

    async findByID(id) {
        return await getObjectOr404(Produto, {
            where: { id },
            include: [ 'categoria' ]
        });
    }

    async create(data) {
        return Produto.create(data);
    }

    async update(id, data) {
        const produto = await this.findByID(id);

        return produto.update(data);
    }

    async destroy(id) {
        const produto = await this.findByID(id);

        return produto.destroy(produto);
    }
}