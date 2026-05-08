// =========================
// IMPORTAMOS LIBRERÍAS
// =========================

// Express: framework para crear el servidor web
const express = require("express");

// Mongoose: librería para conectarse a MongoDB
const mongoose = require("mongoose");

// Cors: permite que otros dominios hagan peticiones a nuestra API
const cors = require("cors");

// Dotenv: carga las variables del archivo .env (PORT, MONGO_URI, etc.)
require("dotenv").config({ path: "./.env" });

// =========================
// INICIALIZACIÓN
// =========================

// Creamos la aplicación de Express
const app = express();

// =========================
// MIDDLEWARES
// =========================

// Permite peticiones desde otros orígenes (Cross-Origin Resource Sharing)
app.use(cors());

// Permite que el servidor entienda JSON en el body de las peticiones
app.use(express.json());

// Sirve los archivos estáticos de la carpeta "public" (HTML, CSS, JS del frontend)
app.use(express.static("public"));

// =========================
// CONEXIÓN A MONGODB
// =========================

// Conectamos a la base de datos usando la URI guardada en el .env
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch((error) => console.error("Error:", error.message));

// =========================
// RUTAS
// =========================

// Todas las rutas de autenticación estarán bajo /api/auth
// Por ejemplo: /api/auth/register y /api/auth/login
app.use("/api/auth", require("./routes/authRoutes"));

// =========================
// PUERTO
// =========================

// Usamos el puerto del .env o el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));