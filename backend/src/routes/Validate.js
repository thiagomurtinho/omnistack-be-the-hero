const { Joi, Segments } = require('celebrate');

module.exports = {
  ongsPost: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.number().integer().required(), //Criar REGex
      city: Joi.string().required(),
      uf: Joi.string().length(2).required()
    })
  },
  incidentsPost: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number()
    })
  }
};
