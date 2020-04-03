const { celebrate } = require('celebrate');
const express = require('express');
const routes = express.Router();
const OngController = require('../controllers/OngController');
const IncidentController = require('../controllers/IncidentController');
const validate = require('./Validate');

routes.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate(validate.ongsPost), OngController.create);

routes.post(
  '/incidents',
  celebrate(validate.incidentsPost),
  IncidentController.create
);

module.exports = routes;
