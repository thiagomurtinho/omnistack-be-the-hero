const request = require('supertest');
const app = require('../../src/app');
const connectionDb = require('../../src/database/connections');

describe('INCIDENTS', () => {
  beforeEach(async () => connectionDb.migrate.latest());
  afterAll(async () => {
    connectionDb.migrate.rollback();
    connectionDb.destroy();
  });
  it('Should be create an incident to ong', async () => {
    const ong_id = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT'
    });
    const response = await request(app)
      .post('/incidents')
      .send({
        title: 'Test Name',
        description: 'Description test',
        value: 120
      })
      .set('auth', ong_id);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
