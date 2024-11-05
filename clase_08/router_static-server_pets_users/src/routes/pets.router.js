import { Router } from "express";

const router = Router();
const pets = [];

router.get("/", (req, res) => {
    res.status(200).json({ status: "success", pets });
});

router.post("/", (req, res) => {
    const { name, specie } = req.body;

    const pet = {
        name,
        specie
    };

    pets.push(pet);
    res.status(200).json({ status: "success", pet });
});

export default router;