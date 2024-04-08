const { Schema, model } = require("mongoose");

const pedidoAccesoriosSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  pedido: [
    {
      accesorio: {
        type: Schema.ObjectId,
        ref: "Accesorio",
      },
      cantidad: Number,
    },
  ],
  total: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model(
  "PedidoAccesorio",
  pedidoAccesoriosSchema,
  "pedidoAccesorios"
);
