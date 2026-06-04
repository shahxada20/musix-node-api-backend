const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");

const { addMusic, deleteMusic, updateMusic, listMusic, listMusicID } = require("../controllers/music.controller");
const { protectRoute } = require("../middlewares/authenticate.middleware");
const { authorizeRoles } = require("../middlewares/authorize.middleware");

// Routes Mapping
router.post("/add", protectRoute, authorizeRoles("artist"), upload.single("image"), addMusic);
router.delete("/delete/:id", protectRoute, authorizeRoles("artist"), deleteMusic);
router.patch("/update/:id", protectRoute, authorizeRoles("artist", "admin"), upload.single("image"), updateMusic);
router.get("/list", listMusic);
router.get("/list/:id", listMusicID);

module.exports = router;