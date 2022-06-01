import express from "express";
import Player from "../models/player.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (e) {
        res.satus(404).json({ message: e.message });
    }
});

router.get("/id=:id", async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findById(id);
        res.status(200).json(player);
    } catch (e) {
        res.satus(404).json({ message: e.message });
    }
});

router.post("/login/", async (req, res) => {
    try {
        const filters = req.body;
        const user = await Player.findOne(filters);
        if (!user) {
            res.status(200).json({ error: "The username of password you entered is incorrect." });
        } else {
            res.status(200).json(user);
        }
    } catch (e) {
        res.status(409).json({ message: e.message });
    }

});

router.post("/", async (req, res) => {
    const player = req.body;
    const newPlayer = new Player(player);
    try {
        await newPlayer.save();
        res.status(201).json(newPlayer)
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
});

router.patch("/:id/award/", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const body = req.body;
    console.log(body);
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No player with that ID");
        const player = await Player.findById(id);
        const updatedPlayer = await Player.findByIdAndUpdate(id, {
            awards: [...player.awards,
                {
                    sponsor: body.sponsor,
                    award: body.award,
                    dateCreated: new Date(),
                    note: body.note
                }
            ]
        }, { new: true });
        console.log(updatedPlayer);
        res.status(200).json(updatedPlayer);
    } catch (e) {
        res.status(409).json({ message: e.message });
    }
    
});

export default router;