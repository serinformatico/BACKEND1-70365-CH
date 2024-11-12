import { Server } from "socket.io";

const messages = [];

// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", (socket) => {
        const clientId = socket.id; // Obtiene el ID del cliente
        console.log("Conexión establecida", clientId);

        // Escucha el evento de saludo del cliente
        socket.on("greet", (data) => {
            console.log(data.text); // Muestra el mensaje recibido

            // Envía un saludo de vuelta al cliente
            socketServer.emit("greeting", { text: "Hola Cliente" });
        });

        // Escucha el evento de nuevo texto enviado por el cliente
        socket.on("newText", (data) => {
            messages.push({ socketId: socket.id, message: data.text });

            // Envía el ID del socket y mensaje a todos los clientes
            socketServer.emit("messages", { messages });
        });

        // Escucha el evento de desconexión del cliente
        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente"); // Indica que un cliente se desconectó
        });
    });
};