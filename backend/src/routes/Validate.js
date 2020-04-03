const { Joi, Segments } = require('celebrate');

module.exports = {
  incidentsPost: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number()
    })
  }
};
