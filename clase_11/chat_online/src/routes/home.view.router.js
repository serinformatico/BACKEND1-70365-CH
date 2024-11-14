import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
        res.render("home", { title: "Inicio" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/chat", (req, res) => {
    res.render("chat", { title: "Chat Online" });
});

export default router;