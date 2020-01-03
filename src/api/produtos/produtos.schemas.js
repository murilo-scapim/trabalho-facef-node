import * as Joi from '@hapi/joi';

export const params = Joi.object({
    id: Joi.number().required()
});

export const payload = Joi.object({
    descricao: Joi.string().min(3).required(),
    quantidade: Joi.number().required(),
    valor: Joi.number().required(),
    categoriaId: Joi.number().required()
});

export const update = {
    params,
    payload
};