import express from "express";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";
import { connectDB } from "./config/mongoose.config.js";

// Importación de enrutadores
import routerCourses from "./routes/courses.router.js";
import routerStudents from "./routes/students.router.js";
import routerViewHome from "./routes/home.view.router.js";

// Se crea una instancia de la aplicación Express
const app = express();

// Conexión con la Base de Datos del Cloud de MongoDB
connectDB();

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Declaración de archivos estáticos desde la carpeta 'public'
// en la ruta 'http://localhost:8080/api/public'
app.use("/api/public", express.static("./src/public"));

// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

// Configuración del motor de plantillas
configHandlebars(app);

// Declaración de rutas
app.use("/api/courses", routerCourses);
app.use("/api/students", routerStudents);
app.use("/", routerViewHome);

// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).render("error404", { title: "Error 404" });
});

// Se levanta el servidor oyendo en el puerto definido
const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de websocket
configWebsocket(httpServer);