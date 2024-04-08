//IMPORTAR DEPENDENCIAS Y MODULOS

const refacciones = require("../models/refacciones");
const reporteRefaccion = require("../models/reporteRefaccion");

const addReport = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;

  //REVISAR SI INGRESAMOS LOS PARAMETROS
  if (!params.refaccion || !params.fecha) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }
  // AL HACER UNA VENTA -> RESTAR DE STOCK LA REFACCION
  console.log("ID DE REFACCION", params.refaccion);

  try {
    //BUSCAR SERVICIO EN DB
    let refaccionStock = await refacciones.findById(params.refaccion);

    //VERIFICAR QUE EL STOCK SEA MAYOR A 0
    const verificarStock = refaccionStock.stock;

    if (verificarStock == 0) {
      return res.status(200).send({
        status: "error",
        message: "no hay stock disponible",
        verificarStock,
      });
    }

    //REBAJAR 1 ELEMENTO DEL STOCK
    // verificarStock = verificarStock - 1
    let nuevoStock = verificarStock - 1;
    console.log(nuevoStock);

    //ACTUALIZAR EL STOCK DE  LA DB
    let updateStock = await refacciones.findOneAndUpdate(
      { _id: params.refaccion },
      { stock: nuevoStock },
      {
        new: true,
      }
    );

    //CREAR OBJETO DE REPORTE
    let refaccion_to_save = new reporteRefaccion(params);
    refaccion_to_save.user = req.user.id;

    // Guardar el articulo en la base de datos
    refaccion_to_save
      .save()
      .then((reporteGuardada) => {
        return res.status(200).json({
          //DEVOLVER DATOS DEL SERVICIO
          status: "success",
          mensaje: "Reporte registrado correctamente y Stock actualizado!",
          reporte: reporteGuardada,
          refaccion: updateStock,
          nuevoStock
        });
      })
      .catch((error) => {
        return res.status(400).json({
          //devolver error
          status: "error",
          mensaje: "No se ha guardado el servicio: " + error.message,
        });
      });
  } catch (error) {
    return res.status(400).json({
      //devolver error
      status: "error",
      mensaje: "No se ha guardado el servicio: " + error.message,
    });
  }
};

const listServices = async (req, res) => {
  console.log(Date.now());
  //Consulta a DB
  try {
    // obtener todos los articulos
    let reporte = await reporteRefaccion
      .find({})
      .populate("refaccion")
      .populate("user");

    if (!reporte.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado reporte",
      });
    }

    return res.status(200).send({
      status: "Success",
      contador: reporte.length,
      reporte,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};

//EXPORTAR ACCIONES
module.exports = {
  addReport,
  listServices,
};
