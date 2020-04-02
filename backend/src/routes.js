const { celebrate, Joi, Segments } = require('celebrate');
const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');

routes.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.number().integer().required(), //Criar REGex
      city: Joi.string().required(),
      uf: Joi.string().length(2).required()
    })
  }),
  OngController.create
);

module.exports = routes;
