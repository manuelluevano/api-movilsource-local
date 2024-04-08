const express = require("express");
const router = express.Router();
const ReporteController = require("../controllers/reporteRefaccion");

//importar middleware
const check = require("../middlewares/auth");

router.post("/refaccion", check.auth, ReporteController.addReport);
router.get("/refacciones", check.auth, ReporteController.listServices);

//Exportar router
module.exports = router;
