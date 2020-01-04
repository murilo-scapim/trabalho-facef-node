import PedidosController from './pedidos.controller';
import * as Schemas from './pedidos.schemas';

const controller = new PedidosController();

export default [
    {
        method: 'GET',
        path: '/pedidos',
        handler: controller.list
    },
    {
        method: 'GET',
        path: '/pedidos/{id}',
        handler: controller.detail,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'POST',
        path: '/pedidos',
        handler: controller.create
    },
    {
        method: 'PUT',
        path: '/pedidos/{id}',
        handler: controller.update
    },
    {
        method: 'DELETE',
        path: '/pedidos/{id}',
        handler: controller.destroy,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    }
];