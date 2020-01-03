import { instances } from 'hapi-sequelizejs';
import { getObjectOr404 } from '../utils/database.utils';

const Cliente = instances.getModel('cliente');

export default class CustomersDAO {

    async findAll(params) {
        return Cliente.findAll({
            where: params
        });
    }

    async findByID(id) {
        return await getObjectOr404(Cliente,
            { where: { id } 
        });
    }

    async create(data) {
        return Cliente.create(data);
    }

    async update(id, data) {
        const cliente = await this.findByID(id);

        return cliente.update(data);
    }

    async destroy(id) {
        const cliente = await this.findByID(id);

        return cliente.destroy();
    }
}