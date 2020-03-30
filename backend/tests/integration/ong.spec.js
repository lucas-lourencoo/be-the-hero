const request = require('supertest');
const app = require('../../src/app');
const connection = require ('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    }); 

    afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    });

    it('Should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "APAE",
            email: "emaildainstituicao@gmail.com",
            whatsapp: "67000000000",
            city: "Ponta Porã",
            uf: "MS"
        })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});