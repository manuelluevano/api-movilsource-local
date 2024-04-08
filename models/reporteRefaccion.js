const { Schema, model } = require("mongoose");

const RefaccionesSchema = Schema({
  refaccion: {
    type: Schema.ObjectId,
    ref: "Refaccion",
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  fecha: {
    type: String,
  },
});

module.exports = model(
  "ReporteRefaccion",
  RefaccionesSchema,
  "reporteRefaccion"
);
