const request = require('supertest');
const app = require('../../src/app');
const connectionDb = require('../../src/database/connections');

describe('ONG', () => {
  beforeEach(async () => {
    await connectionDb.migrate.rollback();
    await connectionDb.migrate.latest();
  });
  afterAll(async () => {
    await connectionDb.destroy();
  });

  it('Should be able to create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT'
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
