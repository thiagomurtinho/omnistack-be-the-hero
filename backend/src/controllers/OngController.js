const connectionDB = require('../database/connections');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(req, res) {
    let ongs = await connectionDB('ongs')
      .select('*')
      .catch(error => res.status(400).json({ err: error.toString() }));
    return res.status(200).json({ ongs });
  },
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = generateUniqueId();

    await connectionDB('ongs')
      .insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      })
      .then(() => res.status(200).json({ id }))
      .catch(error => res.status(400).json({ err: error.toString() }));
  }
};
