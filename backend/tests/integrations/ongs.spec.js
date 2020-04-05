const request = require('supertest');
const app = require('../../src/app');
const connectionDb = require('../../src/database/connections');

describe('ONG', () => {
  beforeEach(async () => await connectionDb.migrate.latest());
  afterAll(async () => {
    await connectionDb.migrate.rollback();
    await connectionDb.destroy();
  });

  it('Should be able to create a new ONG', async () => {
    const {
      statusCode,
      body,
      body: { id },
    } = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT',
    });

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('id');
    expect(id).toHaveLength(8);
  });

  it('Should be able to index all ONGs', async () => {
    const {
      statusCode,
      body: { ongs },
    } = await request(app).get('/ongs');

    expect(statusCode).toBe(200);
    expect(ongs).not.toBeNull();
    ongs.map((ong, index) =>
      expect(ongs[index]).toHaveProperty(
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
