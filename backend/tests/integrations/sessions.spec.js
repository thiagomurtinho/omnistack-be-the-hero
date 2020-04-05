const request = require('supertest');
const app = require('../../src/app');
const connectionDb = require('../../src/database/connections');

describe('SESSIONS', () => {
  beforeEach(async () => await connectionDb.migrate.latest());
  afterAll(async done => {
    await connectionDb.migrate.rollback();
    await connectionDb.destroy(done);
    await done();
  });

  it('Should be create a Session for any ONG', async () => {
    const {
      body: { id },
    } = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT',
    });

    const { statusCode, body } = await request(app)
      .post('/sessions')
      .send({ id });

    expect(statusCode).toBe(200);
    expect(body).not.toBeNull();
  });
});
