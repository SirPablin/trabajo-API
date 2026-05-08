// Importamos Express para crear el router
const express = require('express');

// Importamos bcryptjs para encriptar y comparar contraseñas
const bcrypt = require("bcryptjs");

// Creamos un router de Express para manejar las rutas de autenticación
const router = express.Router();

// Importamos el modelo User para interactuar con la colección de usuarios en MongoDB
const User = require("../models/User");

// =========================
// RUTA: REGISTRO DE USUARIO
// POST /api/auth/register
// =========================
router.post("/register", async (req, res) => {
    try {
        // Extraemos username y password del cuerpo de la petición
        const { username, password } = req.body;

        // Verificamos si ya existe un usuario con ese nombre en la base de datos
        const userExists = await User.findOne({ username });

        // Si el usuario ya existe, respondemos con error 400 (mala petición)
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Encriptamos la contraseña antes de guardarla (10 = nivel de seguridad)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el nuevo usuario con la contraseña encriptada
        const newUser = new User({ username, password: hashedPassword });

        // Guardamos el usuario en la base de datos
        await newUser.save();

        // Respondemos con éxito y código 201 (recurso creado)
        res.status(201).json({ message: "Usuario registrado correctamente" });

    } catch (error) {
        // Si ocurre un error inesperado, respondemos con código 500
        console.error("ERROR EN REGISTER:", error.message);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// =========================
// RUTA: LOGIN DE USUARIO
// POST /api/auth/login
// =========================
router.post("/login", async (req, res) => {
    try {
        // Extraemos username y password del cuerpo de la petición
        const { username, password } = req.body;

        // Buscamos el usuario en la base de datos por su nombre
        const user = await User.findOne({ username });

        // Si el usuario no existe, respondemos con error 401 (no autorizado)
        if (!user) return res.status(401).json({ message: "Error en la autenticacion" });

        // Comparamos la contraseña ingresada con la contraseña encriptada guardada
        const validPassword = await bcrypt.compare(password, user.password);

        // Si la contraseña no coincide, respondemos con error 401
        if (!validPassword) return res.status(401).json({ message: "Error en la autenticacion" });

        // Si todo está correcto, respondemos con éxito y código 200
        res.status(200).json({ message: "Autenticacion satisfactoria" });

    } catch (error) {
        // Si ocurre un error inesperado, respondemos con código 500
        console.error("ERROR EN LOGIN:", error.message);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// Exportamos el router para que server.js pueda usarlo
module.exports = router;