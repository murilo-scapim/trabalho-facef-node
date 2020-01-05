import { instances } from 'hapi-sequelizejs';
import HapiAuthJWT from 'hapi-auth-jwt2';
import Env from './environment.config';

const validate = async (decoded) => {
    const Cliente = instances.getModel('cliente');
    const cliente = await Cliente.findByPk(decoded.id);
    const isValid = !!cliente;
    const credentials = isValid ? cliente : null;

    return { isValid, credentials };
};

async function register(server) {
    await server.register({
        plugin: HapiAuthJWT
    });

    server.auth.strategy('jwt', 'jwt', {
        key: Env.JWT_SECRET,
        validate
    });

    server.auth.default('jwt');
};

export const plugin = {
    name: 'authentication',
    version: '1.0.0',
    register
};

export default plugin;