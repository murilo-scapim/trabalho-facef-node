import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK } from 'http-status';
import { init } from '../../../src/config/server.config';
import { getToken, serverInject } from '../../test.utils';

const { before, after, describe, it } = exports.lab = Lab.script();

describe('Routes /clientes', () => {
    let server;
    let authorization;

    before(async () => {
        server = await init();
        authorization = await getToken(server);
    });

    after(async () => {
        await server.stop();
    });

    describe('GET /clientes', () => {
        it('returns 200 HTTP status code', async () => {
            const res = await serverInject({
                method: 'GET',
                url: '/clientes',
                headers: { authorization }
            }, server);

            expect(res.statusCode).to.equal(OK);
        });
    });

    describe('POST /clientes', () => {
        it('returns 201 HTTP status code', async () => {
            const res = await serverInject({
                method: 'POST',
                url: '/clientes',
                payload: {
                    nome: 'Vinicius',
                    numeroCpfCnpj: '511.497.960-49',
                    email: 'vinicius@teste.com',
                    senha: '123456'
                }
            }, server);

            expect(res.statusCode).to.equal(CREATED);
        });

        it('returns 400 HTTP status code when payload is invalid', async () => {
            const res = await serverInject({
                method: 'POST',
                url: '/clientes',
                payload: {
                    nome: 'Vinicius'
                }
            }, server);

            expect(res.statusCode).to.equal(BAD_REQUEST);
        });
    });

    describe('GET /clientes/{id}', () => {
        let cliente;

        before(async () => {
            const res = await serverInject({
                method: 'POST',
                url: '/clientes',
                headers: { authorization },
                payload: {
                    nome: 'Daniel',
                    numeroCpfCnpj: '686.064.210-65',
                    email: 'daniel@email.com',
                    senha: '123456'
                }
            }, server);

            cliente = res.payload;
        });

        it('returns 200 HTTP status code', async () => {
            const res = await serverInject({
                method: 'GET',
                url: `/clientes/${cliente.id}`,
                headers: { authorization },
            }, server);

            expect(res.statusCode).to.equal(OK);
        });

        it('returns 400 HTTP status code when id is not a number', async () => {
            const res = await serverInject({
                method: 'GET',
                url: '/clientes/asdf',
                headers: { authorization },
            }, server);

            expect(res.statusCode).to.equal(BAD_REQUEST);
        });

        it('returns 404 HTTP status code when customer does not exists', async () => {
            const res = await serverInject({
                method: 'GET',
                url: '/clientes/0',
                headers: { authorization },
            }, server);

            expect(res.statusCode).to.equal(NOT_FOUND);
        });
    });

    describe('PUT /clientes/{id}', () => {
        let cliente;

        before(async () => {
            const res = await serverInject({
                method: 'POST',
                url: '/clientes',
                headers: { authorization },
                payload: {
                    nome: 'Marcos',
                    numeroCpfCnpj: '101.461.620-48',
                    email: 'marcos@email.com',
                    senha: '123456'
                }
            }, server);

            cliente = res.payload;
        });

        it('returns 200 HTTP status code', async () => {
            const res = await serverInject({
                method: 'PUT',
                url: `/clientes/${cliente.id}`,
                headers: { authorization },
                payload: {
                    nome: 'Novo Nome',
                    numeroCpfCnpj: '101.461.620-48',
                    email: 'novo-email@email.com',
                    senha: '123456'
                }
            }, server);

            expect(res.statusCode).to.equal(OK);
        });

        it('returns 400 HTTP status code when payload is invalid', async () => {
            const res = await serverInject({
                method: 'PUT',
                url: `/clientes/${cliente.id}`,
                headers: { authorization },
                payload: {
                    nome: 'Novo Nome'
                }
            }, server);

            expect(res.statusCode).to.equal(BAD_REQUEST);
        });

        it('returns 404 HTTP status code when customer does not exist', async () => {
            const res = await serverInject({
                method: 'PUT',
                url: '/clientes/0',
                headers: { authorization },
                payload: {
                    nome: 'Novo Nome',
                    numeroCpfCnpj: '101.461.620-48',
                    email: 'novo-email@email.com',
                    senha: '123456'
                }
            }, server);

            expect(res.statusCode).to.equal(NOT_FOUND);
        });
    });

    describe('DELETE /clientes/{id}', () => {
        let cliente;

        before(async () => {
            const res = await serverInject({
                method: 'POST',
                url: '/clientes',
                headers: { authorization },
                payload: {
                    nome: 'Mateus',
                    numeroCpfCnpj: '019.572.780-05',
                    email: 'mateus@email.com',
                    senha: '123456'
                }
            }, server);

            cliente = res.payload;
        });

        it('returns 204 HTTP status code', async () => {
            const res = await serverInject({
                method: 'DELETE',
                url: `/clientes/${cliente.id}`,
                headers: { authorization }
            }, server);

            expect(res.statusCode).to.equal(NO_CONTENT);
        });

        it('returns 400 HTTP status code when id is not a number', async () => {
            const res = await serverInject({
                method: 'DELETE',
                url: '/clientes/asdf',
                headers: { authorization }
            }, server);

            expect(res.statusCode).to.equal(BAD_REQUEST);
        });

        it('returns 404 HTTP status code when customer does not exist', async () => {
            const res = await serverInject({
                method: 'DELETE',
                url: `/clientes/${cliente.id}`,
                headers: { authorization }
            }, server);

            expect(res.statusCode).to.equal(NOT_FOUND);
        });
    });
});