const express = require("express");
const router = express.Router();
const accesorioController = require("../controllers/accesorios");

//importar middleware
const check = require("../middlewares/auth");

router.post("/accesorio", accesorioController.addAccesorio);
router.get("/accesorios", check.auth, accesorioController.listAccesorio);
router.get("/accesorio/:id", accesorioController.detail);

// router.post("/refaccion/:id", refaccionController.addRefaccion);
router.get("/accesorios/:busqueda", accesorioController.buscador);
router.put("/accesorio/:id",check.auth,accesorioController.editar);

//Exportar router
module.exports = router;
