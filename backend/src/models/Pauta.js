const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const pautaSchema = new mongoose.Schema(
  {
    pauta: String
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

pautaSchema.virtual("pautaDoDia").get(function() {
  return `http://localhost:4000/files/${this.pauta}`;
});

pautaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Pauta", pautaSchema);
