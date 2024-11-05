import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine with Logging
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Uploading file to 'uploads' directory...");
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()} ${file.originalname}`;
        console.log(`Original filename: ${file.originalname}`);
        console.log(`Generated filename: ${filename}`);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    if (!req.file) {
        console.error("Image upload failed: No file received.");
        return res.status(400).json({ success: false, message: "Image upload failed. No file received." });
    } else {
        console.log(`File received: ${req.file.filename}`);
        next();
    }
}, addFood);

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
