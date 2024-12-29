import { Server } from "socket.io";
import ProductManager from "../managers/ProductManager.js";

const productManager = new ProductManager();

// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", async (socket) => {
        console.log("Conexión establecida", socket.id);

        // Envía la lista de productos al conectarse
        socketServer.emit("products-list", { products: await productManager.getAll() });

        socket.on("insert-product", async (data) => {
            try {
                await productManager.insertOne(data);

                // Envía la lista de productos actualizada después de insertar
                socketServer.emit("products-list", { products: await productManager.getAll() });
            } catch (error) {
                // Envía el mensaje de error
                socketServer.emit("error-message", { message: error.message });
            }
        });

        socket.on("delete-product", async (data) => {
            try {
                await productManager.deleteOneById(Number(data.id));

                // Envía la lista de productos actualizada después de insertar
                socketServer.emit("products-list", { products: await productManager.getAll() });
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