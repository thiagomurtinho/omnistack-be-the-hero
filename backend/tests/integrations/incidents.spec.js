const request = require('supertest');
const app = require('../../src/app');
const connectionDb = require('../../src/database/connections');

describe('INCIDENTS', () => {
  beforeEach(async () => await connectionDb.migrate.latest());
  afterAll(async done => {
    await connectionDb.migrate.rollback();
    await connectionDb.destroy(done);
    await done();
  });

  it('Should be create an incident to ong', async () => {
    const {
      body: { id: ong_id },
    } = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT',
    });

    const { statusCode, body } = await request(app)
      .post('/incidents')
      .send({
        title: 'Test Name',
        description: 'Description test',
        value: 120,
      })
      .set('auth', ong_id);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('id');
  });

  it('Should be able to index an incident', async () => {
    const {
      body: { id: ong_id },
    } = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT',
    });

    await request(app) // inserir o retorno em varipavel e testar se é numero
      .post('/incidents')
      .send({
        title: 'Test Name',
        description: 'Description test',
        value: 120,
      })
      .set('auth', ong_id);

    const {
      statusCode,
      body: { incidents },
    } = await request(app).get('/incidents');

    expect(statusCode).toBe(200);
    expect(incidents).not.toBeNull();

    incidents.map(incident =>
      expect(incident).toHaveProperty(
        'id',
        'title',
        'description',
        'value',
        'ong_id'
      )
    );
  });

  it('Should be able to delete an incident', async () => {
    const {
      body: { id: ong_id },
    } = await request(app).post('/ongs').send({
      name: 'Test Name',
      email: 'test@email.com',
      whatsapp: '21000000000',
      city: 'Test City',
      uf: 'TT',
    });

    const {
      body: { id: incidentId },
    } = await request(app)
      .post('/incidents')
      .send({
        title: 'Test Name',
        description: 'Description test',
        value: 120,
      })
      .set('auth', ong_id);

    const {
      statusCode,
      body: { id },
    } = await request(app)
      .delete(`/incidents/${incidentId}`)
      .set('auth', ong_id);

    expect(statusCode).toBe(200);
    expect(id).not.toBeNull();
  });
});
