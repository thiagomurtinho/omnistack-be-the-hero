const connectionDb = require('../database/connections');

module.exports = {
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.auth;

    const [id] = await connectionDb('incidents')
      .insert({
        title,
        description,
        value,
        ong_id
      })
      .catch(err => res.status(400).json({ err: err.toString() }));

    return res.status(200).json({ id });
  }
};
