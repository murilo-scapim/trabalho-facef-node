import ClientesController from './clientes.controllers';
import * as Schemas from './clientes.schemas';

const controller = new ClientesController();

export default [
    {
        method: 'GET',
        path: '/clientes',
        handler: controller.list,
    },
    {
        method: 'GET',
        path: '/clientes/{id}',
        handler: controller.detail,
        config: {
            validate: Schemas.detail
        }
    },
    {
        method: 'POST',
        path: '/clientes',
        handler: controller.create,
        config: {
            validate: Schemas.create
        }
    },
    {
        method: 'PUT',
        path: '/clientes/{id}',
        handler: controller.update,
        config: {
            validate: Schemas.update
        }
    },
    {
        method: 'DELETE',
        path: '/clientes/{id}',
        handler: controller.destroy,
        config: {
            validate: Schemas.detail
        }
    }
];