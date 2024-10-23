const mongoose = require("mongoose");

const normaEuropaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    precio: { type: String, required: false },
    img: { type: String, required: true },
    estado: { type: String, required: true },
  }, {
  timestamps: true,
  collection: "comicsNCEuropa"
}
);

const ComicsNCeuropa = mongoose.model("comicsNCEuropa", normaEuropaSchema, "comicsNCEuropa");
module.exports = ComicsNCeuropa;