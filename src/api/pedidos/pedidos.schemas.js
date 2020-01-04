import * as Joi from '@hapi/joi';

export const params = Joi.object({
    id: Joi.number().required()
});

export const payload = Joi.object({
    valor: Joi.number().required()
});

export const detail = {
    params
};

export const create = {
    payload
};

export const update = {
    params,
    payload
};