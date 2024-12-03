// Establece la conexión con el servidor usando Socket.IO
const socket = io();

// Evento que se activa al conectar con el servidor
socket.on("connect", () => {
    // Indica que la conexión fue exitosa
    console.log("Conectado al Server");
});

// Evento que se activa al desconectarse del servidor
socket.on("disconnect", () => {
    // Indica que se perdió la conexión
    console.log("Se desconecto el server");
});