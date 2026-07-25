import express from "express";
import { getWaveform } from "../controllers/project.controller.js";

const router = express.Router();

router.get("/:projectId/waveform", getWaveform);

export default router;