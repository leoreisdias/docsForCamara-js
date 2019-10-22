const Pauta = require("../models/Pauta");
const fs = require("fs");
const path = require("path");

module.exports = {
  async store(req, res) {
    const { filename } = req.file;

    if (!filename) {
      const error = new Error("Selecione um arquivo");
      error.httpStatusCode = 400;
      return next(error);
    }

    const pauta = await Pauta.create({
      pauta: filename
    });

    console.log("File Sent!");
    return res.json(pauta);
  },

  async destroy(req, res) {
    const pauta = await Pauta.findOne({ _id: req.params.id });
    const pautaPath = path.resolve(
      __dirname,
      "..",
      "..",
      "pautas",
      `${pauta.pauta}`
    );
    await Pauta.findOneAndDelete({ _id: pauta._id });
    fs.unlink(`${pautaPath}`, function(err) {
      if (err) throw alert("Tente novamente mais tarde!");
      console.log("File deleted!");
    });
    return res.send();
  }
};
