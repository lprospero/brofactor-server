import mongoose from "mongoose";

const playerScehma = mongoose.Schema({
    name: String,
    avatar: String,
    dateCreated : {
        type: Date,
        default: new Date()
    },
    awards: [{
        sponsor: String,
        award: String,
        dateCreated : Date
    }],
    email: String,
    password: String,
    experience: Number
});

const Player = mongoose.model("Player", playerScehma);

export default Player;