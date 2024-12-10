import { Server } from "socket.io";
import IngredientManager from "../managers/IngredientManager.js";

const ingredientManager = new IngredientManager();

// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", async (socket) => {
        console.log("Conexión establecida", socket.id);

        // Envía la lista de ingredientes al conectarse
        socketServer.emit("ingredients-list", { ingredients: await ingredientManager.getAll() });

        socket.on("insert-ingredient", async (data) => {
            try {
                await ingredientManager.insertOne(data);

                // Envía la lista de ingredientes actualizada después de insertar
                socketServer.emit("ingredients-list", { ingredients: await ingredientManager.getAll() });
            } catch (error) {
                // Envía el mensaje de error
                socketServer.emit("error-message", { message: error.message });
            }
        });

        socket.on("delete-ingredient", async (data) => {
            try {
                await ingredientManager.deleteOneById(Number(data.id));

                // Envía la lista de ingredientes actualizada después de insertar
                socketServer.emit("ingredients-list", { ingredients: await ingredientManager.getAll() });
            } catch (error) {
                // Envía el mensaje de error
                socketServer.emit("error-message", { message: error.message });
            }
        });

        // Escucha el evento de desconexión del cliente
        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente"); // Indica que un cliente se desconectó
        });
    });
};