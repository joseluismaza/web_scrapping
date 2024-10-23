const mongoose = require("mongoose");

const normaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    precio: { type: String, required: false },
    img: { type: String, required: true },
    estado: { type: String, required: true },
  }, {
  timestamps: true,
  collection: "comicsN"
}
);

const ComicsN = mongoose.model("comicsN", normaSchema, "comicsN");
module.exports = ComicsN;