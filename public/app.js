// =========================
// REGISTRO
// =========================

// Función que se ejecuta cuando el usuario hace clic en "Registrarse"
async function register() {

    // Obtenemos los valores escritos en los campos del formulario
    const username = document.getElementById("registerUser").value;
    const password = document.getElementById("registerPass").value;

    try {
        // Hacemos una petición POST a la API con los datos del formulario
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                // Le decimos al servidor que enviamos datos en formato JSON
                "Content-Type": "application/json"
            },
            // Convertimos el objeto a texto JSON para enviarlo
            body: JSON.stringify({ username, password })
        });

        // Convertimos la respuesta del servidor a un objeto JavaScript
        const data = await response.json();

        // Buscamos el elemento donde mostraremos el mensaje al usuario
        const message = document.getElementById("message");

        // Si el elemento existe, mostramos el mensaje de la respuesta
        if (message) {
            message.innerText = data.message;
        }

    } catch (error) {
        // Si ocurre un error en la petición, lo mostramos en la consola
        console.error("Error en registro:", error);
    }
}


// =========================
// LOGIN
// =========================

// Función que se ejecuta cuando el usuario hace clic en "Iniciar sesión"
async function login() {

    // Obtenemos los valores escritos en los campos del formulario
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    try {
        // Hacemos una petición POST a la API con los datos del formulario
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                // Le decimos al servidor que enviamos datos en formato JSON
                "Content-Type": "application/json"
            },
            // Convertimos el objeto a texto JSON para enviarlo
            body: JSON.stringify({ username, password })
        });

        // Convertimos la respuesta del servidor a un objeto JavaScript
        const data = await response.json();

        // Buscamos el elemento donde mostraremos el mensaje al usuario
        const message = document.getElementById("message");

        // Si el elemento existe, mostramos el mensaje de la respuesta
        if (message) {
            message.innerText = data.message;
        }

    } catch (error) {
        // Si ocurre un error en la petición, lo mostramos en la consola
        console.error("Error en login:", error);
    }
}