const connectionDb = require('../database/connections');

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ong = await connectionDb('ongs')
      .where('id', id)
      .first()
      .select('*')
      .catch(err => res.status(400).json({ error: err.toString() }));

    if (!ong) {
      return res.status(401).json({ error: 'No ONG Found' });
    }

    return res.status(200).json(ong);
  },
};
