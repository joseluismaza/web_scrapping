const mongoose = require("mongoose");

const librosNCSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    precio: { type: String, required: false },
    img: { type: String, required: true },
    estado: { type: String, required: true },
  }, {
  timestamps: true,
  collection: "librosNC"
}
);
const LibrosNC = mongoose.model("librosNC", librosNCSchema, "librosNC");
module.exports = LibrosNC;
