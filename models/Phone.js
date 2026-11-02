import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    screenSize: { type: Number, required: true, min: 0 },
    ram: { type: Number, required: true, min: 1 },
    rom: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 1}
});

export default mongoose.model("Phone", phoneSchema)