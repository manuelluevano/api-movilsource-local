//CONEXION A BASE DE DATOS
const connection  = require("./db/conexion");
const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "variables.env" });


//Conectar a la base de datos MONGO
connection()

//CREAR SERVIDOR DE NODE
const app = express()

//CONFIGURAR EL CORS
app.use(cors())

//CONVERTIR LOS DATOS DEL BODY A OBJETO JS
app.use(express.json({
    limit: '50mb'
}));

app.use(express.urlencoded({extended: true}));

//CARGAR LAS RUTAS
const UserRutes = require("./routes/user")
const ServiceRutes = require("./routes/service")
const RefaccionRutes = require("./routes/refacciones")
const ReporteRefaccionRutes = require("./routes/reporteRefaccion")
const AccesorioRutes = require("./routes/accesorios")
const PedidoAccesorioRutes =  require("./routes/pedidoAccesorios")

app.use("/api/user", UserRutes)
app.use("/api/service", ServiceRutes)
app.use("/api/refaccion", RefaccionRutes)
app.use("/api/reporte", ReporteRefaccionRutes)
app.use("/api/accesorio", AccesorioRutes)
app.use("/api/pedido", PedidoAccesorioRutes)

 
//RUTA PRUEBA
app.get("/ruta-prueba", (req, res)=> {
    return res.status(200).json(
        {
            id: 1,
            nombre: "Vistor"
        }
    )
})

var host = process.env.HOST || "0.0.0.0";
var port = process.env.PORT || 3000;

//Crear servidor y escuchar peticiones http
app.listen(port,host, () => {
  console.log("Servidor corriendo en el pueto", port);
});
