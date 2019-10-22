const Pauta = require("../models/Pauta");
const path = require("path");

module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const ext = path.extname(filename.originalname);
    const name = path.basename(filename.originalname, ext);
    const description = name;

    if (!filename) {
      const error = new Error("Selecione um arquivo");
      error.httpStatusCode = 400;
      return next(error);
    }

    const pauta = await Pauta.create({
      pauta: filename,
      description
    });

    console.log("Enviado com Sucesso!");
    return res.json(pauta);
  },

  async destroy(req, res) {
    await Pauta.findOneAndDelete(req.params.id);

    return res.send();
  }
};
