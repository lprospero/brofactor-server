import express from "express";
import Award from "../models/award.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const awards = await Award.find();
        res.status(200).json(awards);
    } catch (e) {
        res.satus(404).json({message: e.message});
    }
});

router.post("/", async (req, res) => {
    const award = req.body;
    const newAward = new Award(award);
    try {
        await newAward.save();
        res.status(201).json(newAward)
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
});

export default router;