const { celebrate } = require('celebrate');
const express = require('express');
const routes = express.Router();
const validate = require('./Validate');
const OngController = require('../controllers/OngController');
const IncidentController = require('../controllers/IncidentController');
const SessionController = require('../controllers/SessionController');

routes.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate(validate.ongsPost), OngController.create);

routes.post('/sessions', SessionController.create);

routes.get('/incidents', IncidentController.index);
routes.post(
  '/incidents',
  celebrate(validate.incidentsPost),
  IncidentController.create
);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
