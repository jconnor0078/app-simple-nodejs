const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

// al activar la propiedad timestamps automaticamente creara las
// propiedades en bd de createrDate y updateDate y se actualizan automaticamente
const productSchema = Schema(
  {
    title: { type: String, require: true },
    desc: { type: String, require: true },
    price: { type: Number, require: true },
    images: { type: [{ type: String, require: true }], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // equivalente a una relacion de entidades
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Product', productSchema);

module.exports = model;
