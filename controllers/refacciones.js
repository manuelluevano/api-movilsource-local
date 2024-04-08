//IMPORTAR DEPENDENCIAS Y MODULOS
const uploadImage = require("../services/uploadImage");
const refacciones = require("../models/refacciones");
const Refaccion = require("../models/refacciones");

const addRefaccion = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body.refaccion;

  //REVISAR SI INGRESAMOS LOS PARAMETROS
  if (
    !params.refaccion ||
    !params.modelo ||
    !params.marca ||
    !params.calidad ||
    !params.precio ||
    !params.stock
  ) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  const linkImg = await uploadImage(params.imagen);

  //CREAR OBJETO
  const newRefaccion = new refacciones({
    refaccion: params.refaccion,
    modelo: params.modelo,
    marca: params.marca,
    calidad: params.calidad,
    precio: params.precio,
    stock: params.stock,
    imagen: linkImg,
  });

  //  Guardar el articulo en la base de datos
  newRefaccion
    .save()
    .then((refaccionGuardada) => {
      return res.status(200).json({
        //DEVOLVER DATOS DE LA REFACCION
        status: "success",
        mensaje: "Refaccion registrada correctamente",
        refaccion: refaccionGuardada,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        //devolver error
        status: "error",
        mensaje: "No se ha guardado el servicio: " + error.message,
      });
    });
};

const listRefaccion = async (req, res) => {
  //Consulta a DB
  try {
    // obtener todos los articulos
    let refacciones = await Refaccion.find({});

    if (!refacciones.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado refacciones",
      });
    }

    return res.status(200).send({
      status: "Success",
      // parametro: req.params.ultimos,
      contador: refacciones.length,
      refacciones,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};

const editar = async (req, res) => {
  //recoger el id
  let id = req.params.id;

  console.log("Parametro", id);
  // //RECOGER DATOS DEL BODY
  let parametros = req.body;

  console.log("Nuevos datos", parametros);
  // //VALIDAR DATOS
  // if (!id) {
  //   return res.status(400).json({
  //     //devolver error
  //     status: "Error",
  //     mensaje: "Faltan datos por enviar",
  //   });
  // }
  //BUSCAR Y ACTUALIZAR ARTICULO
  try {
    let refaccion = await Refaccion.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    //MOSTRAR EL ARTICULO
    return res.status(200).json({
      status: "Success",
      mensaje: "Servicio Actualizado 👌🏿",
      refaccion: refaccion,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Error",
      mensaje: "Faltan datos para enviar",
    });
  }
};

const buscador = async (req, res) => {
  try {
    //Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    //Find OR // OR = SELECT * FROM
    let refacciones = await Refaccion.find({
      $or: [
        { refaccion: { $regex: busqueda, $options: "i" } },
        { modelo: { $regex: busqueda, $options: "i" } },
        { marca: { $regex: busqueda, $options: "i" } },
        { calidad: { $regex: busqueda, $options: "i" } },
      ],
    });

    if (!refacciones.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado services",
      });
    }

    //Devolver resultado
    return res.status(200).send({
      status: "Success",
      contador: refacciones.length,
      refacciones,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      mensaje: "Error al buscar",
    });
  }
};

//SACAR UNA PUBLICACION POR ID

const detail = async (req, res) => {
  let refaccionID = req.params.id;

  try {
    let refaccion = await refacciones.findById(refaccionID)

    if (!refaccion) {
      return res.status(404).send({
        status: "error",
        mensaje: "No existe la publicacion",
      });
    }

    return res.status(200).send({
      status: "Success",
      refaccion
    });

  }catch{
    return res.status(400).json({
      status: "Error",
      mensaje: "No existe la refaccion",
    });
  }
  
};


//EXPORTAR ACCIONES
module.exports = {
  addRefaccion,
  listRefaccion,
  buscador,
  editar,
  detail
};
