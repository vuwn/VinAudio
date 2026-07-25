import ProjectService from "../services/project.service.js";
import AudioService from "../services/audio.service.js";
import WaveFormService from "../services/waveform.service.js";
import fs from "fs";
import path from "path";

export const uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Không có file",
      });
    }

    const { projectId, projectPath } = await ProjectService.createProject(
      req.file,
    );

    const source = req.file.path;
    const destination = path.join(projectPath, "audio", "original.mp3");

    fs.renameSync(source, destination);

    const audioInfo = await AudioService.getAudioInfo(destination);

    await AudioService.convertToWav(projectPath);

    ProjectService.updateMetadata(projectPath, audioInfo);

    WaveFormService.generate(projectPath);

    return res.json({
      success: true,
      project: {
        id: projectId,
        status: "uploaded",
      },
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
