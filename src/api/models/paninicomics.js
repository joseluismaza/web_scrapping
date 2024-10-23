const mongoose = require("mongoose");

const paniniSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    precio: { type: String, required: false },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "comicsP",
  }
);

const ComicsP = mongoose.model("comicsP", paniniSchema, "comicsP");
module.exports = ComicsP;
