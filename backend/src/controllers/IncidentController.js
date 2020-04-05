const connectionDb = require('../database/connections');

module.exports = {
  async index(req, res) {
    const incidents = await connectionDb('incidents')
      .select('*')
      .catch(error => res.status(400).json({ err: error.toString() }));

    return res.status(200).json({ incidents });
  },
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.auth;

    const ong = await connectionDb('ongs')
      .where('id', ong_id)
      .first()
      .select('id')
      .catch(error => res.status(400).json({ err: error.toString() }));

    if (!ong) {
      return res.status(200).json({ err: 'ONG dont existis' });
    }

    const [id] = await connectionDb('incidents')
      .insert({ title, description, value, ong_id })
      .catch(err => res.status(400).json({ err: err.toString() }));

    return res.status(200).json({ id });
  },
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.auth;

    const incidents = await connectionDb('incidents')
      .where({ id, ong_id })
      .first()
      .select('*')
      .del()
      .catch(error => res.status(400).json({ err: error.toString() }));

    if (!incidents) {
      return res.status(401).json({ err: 'Not permitted' });
    }

    return res.status(200).json({ id });
  },
};
