// Establece la conexión con el servidor usando Socket.IO
const socket = io();

// Obtiene los elementos del DOM
const mySocketId = document.getElementById("my-socket-id");
const text = document.getElementById("text");
const messages = document.getElementById("messages");

// Escucha el evento de pulsar una tecla en el campo de texto
text.addEventListener("keyup", () => {
    // Envía el texto actual al servidor
    socket.emit("newText", { text: text.value });
});

// Escucha el evento de recibir mensajes desde el servidor
socket.on("messages", (data) => {
    // Renderiza el ID del socket del cliente
    mySocketId.innerText = `Mi socketId: ${socket.id}`;

    // Renderiza el ID del socket del emisor y el mensaje recibido
    messages.innerHTML = "";
    data.messages.forEach((item) => {
        messages.innerHTML += `SocketId: ${item.socketId}, mensaje: ${item.message}<br>`;
    });
});