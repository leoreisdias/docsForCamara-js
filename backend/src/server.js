const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");

const app = express();

mongoose.connect(
  "mongodb+srv://camara:teste@camaramuz-i6px9.mongodb.net/camaramuz?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

app.use(express.json());
app.use(cors());

app.use(routes);
app.use("/files", express.static(path.resolve(__dirname, "..", "pautas")));
app.listen(4000);
