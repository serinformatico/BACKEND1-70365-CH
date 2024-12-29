import { Router } from "express";
import moment from "moment";
import ProductManager from "../managers/ProductManager.js";
import CartManager from "../managers/CartManager.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

// Ruta para obtener y mostrar una lista de productos
router.get("/products", async (req, res) => {
    try {
        const carts = await cartManager.getAll();
        const cart = carts.docs[0];
        const payload = await productManager.getAll(req.query);
        res.render("home", { title: "Inicio", payload, cart });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

// Ruta para obtener y mostrar los detalles de un producto específico
router.get("/products/:id", async (req, res) => {
    try {
        const payload = await productManager.getOneById(req.params.id);
        payload.createdAt = moment(payload.createdAt).format("YYYY-MM-DD HH:mm:ss");
        payload.updatedAt = moment(payload.updatedAt).format("YYYY-MM-DD HH:mm:ss");
        res.render("homeProduct", { title: "Producto", payload });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

// Ruta para obtener y mostrar los detalles de un carrito específico
router.get("/carts/:id", async (req, res) => {
    try {
        const payload = await cartManager.getOneById(req.params.id);
        res.render("homeCart", { title: "Carrito", payload });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

// Ruta para renderizar la página de productos en tiempo real
router.get("/realTimeProducts", async (req, res) => {
    try {
        res.render("realTimeProducts", { title: "Inicio" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default router;