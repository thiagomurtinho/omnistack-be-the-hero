const request = require('supertest');
const app = require('../../src/app');
const connectionDb = require('../../src/database/connections');

describe('INCIDENTS', () => {
  beforeEach(async () => await connectionDb.migrate.latest());
  afterAll(async () => {
    await connectionDb.migrate.rollback();
    await connectionDb.destroy();
  });

  it('Should be create an incident to ong', async () => {
    const ong_id = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT',
    });

    const response = await request(app)
      .post('/incidents')
      .send({
        title: 'Test Name',
        description: 'Description test',
        value: 120,
      })
      .set('auth', ong_id);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to index an incident', async () => {
    const ong_id = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT',
    });

    await request(app)
      .post('/incidents')
      .send({
        title: 'Test Name',
        description: 'Description test',
        value: 120,
      })
      .set('auth', ong_id);

    const response = await request(app).get('/incidents');

    expect(response.statusCode).toBe(200);
    expect(response.body.incidents).not.toBeNull();

    response.body.incidents.map(incident =>
      expect(incident).toHaveProperty(
        'id',
        'title',
        'description',
        'value',
        'ong_id'
      )
    );
  });
});
