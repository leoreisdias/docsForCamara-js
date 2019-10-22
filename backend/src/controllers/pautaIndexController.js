const Pauta = require("../models/Pauta");

module.exports = {
  async show(req, res) {
    const { page = 1 } = req.query;
    const pautas = await Pauta.paginate({}, { page, limit: 6 });

    return res.json(pautas);
  }
};
