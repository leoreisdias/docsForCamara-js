const express = require("express");
const multer = require("multer");

const pautaController = require("./controllers/pautaController");
const pautaIndexController = require("./controllers/pautaIndexController");

const uploadconfig = require("./config/upload");

const upload = multer(uploadconfig);

const routes = express.Router();

routes.post("/upload", upload.single("pauta"), pautaController.store);

routes.get("/pautaIndex", pautaIndexController.show);

routes.delete("/pautas/:id", pautaController.destroy);

module.exports = routes;
