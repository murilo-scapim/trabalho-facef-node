import CategoriasController from './categorias.controllers';
import * as Schemas from './categorias.schemas';

const controller = new CategoriasController();

export default [
    {
        method: 'GET',
        path: '/categorias',
        handler: controller.list
    },
    {
        method: 'GET',
        path: '/categorias/{id}',
        handler: controller.detail,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'POST',
        path: '/categorias',
        handler: controller.create,
        config: {
            validate: {
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: '/categorias/{id}',
        handler: controller.update,
        config: {
            validate: Schemas.update
        }
    },
    {
        method: 'DELETE',
        path: '/categorias/{id}',
        handler: controller.destroy,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    }
]