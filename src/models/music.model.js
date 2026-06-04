const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true });

const Music = mongoose.model("music", musicSchema);
module.exports = Music;