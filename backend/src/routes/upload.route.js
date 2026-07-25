import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import { uploadAudio } from "../controllers/update.controller.js";

const router = Router();

router.post(
    "/upload",
    upload.single("audio"),
    uploadAudio
);

export default router;