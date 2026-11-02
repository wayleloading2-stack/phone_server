import express from "express";
import mongoose from "mongoose";
import Phone from "./models/Phone.js";

const app = express();
const PORT = 5000;
const DB = "mongodb://127.0.0.1:27017/phones";

app.use(express.json());

app.get("/api/phones", async (req, res) => {
    try {
        const phones = await Phone.find()
        res.json(phones)
    } catch (error) {
        res.status(500).json({ message: "Ошибка получения телефонов" });
    }
});

app.get("/api/phones/:id", async (req, res) => {
    try {
        const phone = await Phone.findById(req.params.id);
        if (!phone) return res.status(404).json({ message: "Телефон не найден" });
        res.json(phone);
    } catch (error) {
        res.status(400).json({ message: "Неверный ID" });
    }
});

app.post("/api/phones", async (req, res) => {
    try {
        const phone = await Phone.create(req.body);
        res.status(201).json(phone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.patch("/api/phones/:id", async (req, res) => {
    try {
        const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!phone) return res.status(404).json({ message: "Телефон не найден" });
        res.json(phone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete("/api/phones/:id", async (req, res) => {
    try {
        const phone = await Phone.findByIdAndDelete(req.params.id);
        if (!phone) return res.status(404).json({ message: "Телефон не найден" });
        res.json({ message: "Телефон удален" });
    } catch (error) {
        res.status(400).json({ message: "Неверный ID телефона" });
    }
})

mongoose.connect(DB)
    .then(() => app.listen(PORT, () => console.log(`Сервер: http://localhost:${PORT}/api/phones`)))
    .catch((error) => console.log("Ошибка MongoDB:", error.message))