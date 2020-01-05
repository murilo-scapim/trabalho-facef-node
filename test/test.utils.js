const handleServerInjectResponse = ({ payload, ...rest }) => {
    if (payload) {
        payload = JSON.parse(payload);
    }

    return { ...rest, payload };
};

export async function serverInject(options, server) {
    const res = await server.inject(options);
    return handleServerInjectResponse(res);
};

export async function getToken(server) {
    let token;
    const payload = {
        nome: 'Ana',
        numeroCpfCnpj: '090.944.220-77',
        email: 'ana@unifacef.com.br',
        senha: '123456'
    };

    const createCliente = async () => {
        return await serverInject({
            method: 'POST',
            url: '/clientes',
            payload
        }, server);
    };

    const createSession = async () => {
        const res = await serverInject({
            method: 'POST',
            url: '/clientes/login',
            payload: {
                email: 'ana@unifacef.com.br',
                senha: '123456'
            }
        }, server);

        token = res.payload.token;
        return res;
    };

    await createCliente();
    await createSession();

    return token;
};