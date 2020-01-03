import ProdutosController from './produtos.controllers';
import * as Schemas from './produtos.schemas';

const controller = new ProdutosController();

export default [
    {
        method: 'GET',
        path: '/produtos',
        handler: controller.list,
    },
    {
        method: 'GET',
        path: '/produtos/{id}',
        handler: controller.detail,
        config: {
            validate: {
                params: Schemas.params
            }  
        }
    },
    {
        method: 'POST',
        path: '/produtos',
        handler: controller.create,
        config: {
            validate: {
                payload: Schemas.payload
            }   
        }
    },
    {
        method: 'PUT',
        path: '/produtos/{id}',
        handler: controller.update,
        config: {
            validate: Schemas.update
        }
    },
    {
        method: 'DELETE',
        path: '/produtos/{id}',
        handler: controller.destroy,
        config: {
            validate: {
                params: Schemas.params
            }  
        }
    }
]