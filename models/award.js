import mongoose from "mongoose";

const awardSchema = mongoose.Schema({
    title: String,
    experience: Number,
    type: Number,
    avatar: String,
    note: String
});

const Award = mongoose.model("Award", awardSchema);

export default Award;