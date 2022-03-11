const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// al activar la propiedad timestamps automaticamente creara las
// propiedades en bd de createrDate y updateDate y se actualizan automaticamente
const storeSchema = Schema(
  {
    nombre: { type: String, require: true },
    iniciales: { type: String, require: true }
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Stores', storeSchema);

module.exports = model;
