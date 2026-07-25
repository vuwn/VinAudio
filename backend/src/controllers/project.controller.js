import ProjectService from "../services/project.service.js";
import path from "path";
import fs from "fs";
export const getWaveform = (req, res) => {

    const { projectId } = req.params;
    
    const projectPath = ProjectService.getProjectPath(projectId);

    const waveformPath = path.join(projectPath, "waveform.json");

    if(!fs.existsSync(waveformPath)) {
        return res.status(404).json({
            success: false,
            message: "Waveform not found"
        });
    }

    const waveform = JSON.parse(fs.readFileSync(waveformPath, "utf-8"));

    return res.json({
        success: true,
        projectId,
        waveform
    })

};