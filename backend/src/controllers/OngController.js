const connectionDB = require('../database/connections');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
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
      .then(() => {
        res.status(200).json({ id });
      })
      .catch(error => {
        const err = error.toString();
        res.status(400).json({ err });
      });
  }
};
