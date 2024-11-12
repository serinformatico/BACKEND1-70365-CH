// Establece la conexión con el servidor usando Socket.IO
const socket = io();

// Evento que se activa al conectar con el servidor
socket.on("connect", () => {
    // Indica que la conexión fue exitosa
    console.log("Conectado al Server");
});

// Envía un saludo al servidor
socket.emit("greet", { text: "Hola Server" });

// Escucha el saludo de respuesta del servidor
socket.on("greeting", (data) => {
    // Muestra el mensaje recibido del servidor
    console.log(data.text);
});

// Evento que se activa al desconectarse del servidor
socket.on("disconnect", () => {
    // Indica que se perdió la conexión
    console.log("Se desconecto el server");
});