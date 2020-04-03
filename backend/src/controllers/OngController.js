const connectionDB = require('../database/connections');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(req, res) {
    const ongs = await connectionDB('ongs')
      .select('*')
      .catch(error => res.status(400).json({ err: error.toString() }));

    return res.status(200).json({ ongs });
  },
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = generateUniqueId();

    const response = await connectionDB('ongs')
      .insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      })
      .catch(error => res.status(400).json({ err: error.toString() }));

    return res.status(200).json({ id });
  }
};
