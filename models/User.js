// Importamos Mongoose para definir el esquema y modelo de la base de datos
const mongoose = require("mongoose");

// =========================
// ESQUEMA DE USUARIO
// =========================
// El esquema define la estructura de los documentos en la colección "users"
const UserSchema = new mongoose.Schema({

    // Campo username: almacena el nombre del usuario
    // type: String indica que es texto
    // required: true significa que es obligatorio, no puede estar vacío
    username: {
        type: String,
        required: true
    },

    // Campo password: almacena la contraseña encriptada del usuario
    // type: String indica que es texto
    // required: true significa que es obligatorio, no puede estar vacío
    password: {
        type: String,
        required: true
    }

});

// Exportamos el modelo "User" basado en el esquema
// Mongoose creará automáticamente la colección "users" en MongoDB
module.exports = mongoose.model("User", UserSchema);