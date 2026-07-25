import ProjectService from "../services/project.service.js";
import AudioService from "../services/audio.service.js";
import fs from "fs";
import path from "path";

export const uploadAudio = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "Không có file"
        });
    }

    const { projectId, projectPath } = await ProjectService.createProject(req.file);
    
    const source = req.file.path;
    const destination = path.join(projectPath, "audio", "original.mp3");
    
    fs.renameSync(source, destination);
    const audioInfo = await AudioService.getAudioInfo(destination);
    ProjectService.updateMetadata(projectPath, audioInfo);

    return res.json({
        success: true,
        project: {
            id: projectId,
            status: "uploaded",
        },
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
    });


};