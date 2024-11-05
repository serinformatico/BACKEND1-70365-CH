import { Router } from "express";
import uploader from "../utils/uploader.js";

const router = Router();
const pets = [];

router.get("/", (req, res) => {
    res.status(200).json({ status: "success", pets });
});

router.post("/", uploader.single("file"), (req, res) => {
    const { name, specie } = req.body;
    const { file } = req;

    if (!file) {
        return res.status(400).send({ status: "error", message: "Archivo no encontrado" });
    }

    const pet = {
        name,
        specie,
        thumbnail: file.filename,
    };

    pets.push(pet);
    res.status(200).json({ status: "success", pet });
});

export default router;