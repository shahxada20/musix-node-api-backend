const musicModel = require("../models/music.model");
const uploadFile = require("../services/storage.service");

const addMusic = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body.title) { return res.status(400).json({ message: "Title is required." }); }

        const existingMusic = await musicModel.findOne({ title: body.title });
        if (existingMusic) { return res.status(409).json({ message: "Music with this title already exists." }); }

        if (body.user && body.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to add this music." });
        }

        let imageUrl = "";
        if (req.file) {
            const uploadResponse = await uploadFile.uploadFile(req.file.buffer);
            imageUrl = uploadResponse.url;
        }

        const newMusic = await musicModel.create({ title: body.title, image: imageUrl, user: req.user._id });

        res.status(201).json({ message: "Music added successfully.", music: newMusic });
    } catch (error) { next(error); }
};


const listMusic = async (req, res, next) => {
    try {
        const musicList = await musicModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Music list retrieved successfully.",
            music: musicList
        });
    } catch (error) { next(error); }
};


const listMusicID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const targetMusic = await musicModel.findById(id);

        if (!targetMusic) {
            return res.status(404).json({ message: "Music not found." });
        }

        res.status(200).json({
            message: "Music retrieved successfully.",
            music: targetMusic
        });
    } catch (error) { next(error); }
};


const deleteMusic = async (req, res, next) => {
    try {
        const { id } = req.params;
        const targetMusic = await musicModel.findById(id);

        if (!targetMusic) {
            return res.status(404).json({ message: "Music not found." });
        }

        if (targetMusic.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this music." });
        }

        await musicModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Music deleted successfully.", music: targetMusic });
    } catch (error) { next(error); }
};


const updateMusic = async (req, res, next) => {
    try {
        const { id } = req.params;
        const targetMusic = await musicModel.findById(id);

        if (!targetMusic) {
            return res.status(404).json({ message: "Music not found." });
        }

        let updatedData = { ...req.body };

        if (targetMusic.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this music." });
        }

        if (req.file) {
            const uploadResponse = await uploadFile.uploadFile(req.file.buffer);
            updatedData.image = uploadResponse.url;
        }

        const updatedMusic = await musicModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Music updated successfully.",
            music: updatedMusic
        });
    } catch (error) { next(error); }
};

module.exports = { addMusic, listMusic, listMusicID, deleteMusic, updateMusic };