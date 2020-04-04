const request = require('supertest');
const app = require('../../src/app');
const connectionDb = require('../../src/database/connections');

describe('ONG', () => {
  beforeEach(async () => await connectionDb.migrate.latest());
  afterAll(async () => {
    await connectionDb.migrate.rollback();
    await connectionDb.destroy();
  });

  const idTest = '';
  it('Should be able to create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('Should be able to index all ONGs', async () => {
    const response = await request(app).get('/ongs');

    expect(response.statusCode).toBe(200);
    expect(response.body.ongs).not.toBeNull();
    response.body.ongs.map((ong, index) =>
      expect(response.body.ongs[index]).toHaveProperty(
        'id',
        'name',
        'email',
        'whatsapp',
        'city',
        'uf'
      )
    );
  });
});
