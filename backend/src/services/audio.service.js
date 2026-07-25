import * as mm from "music-metadata";
import ProjectService from "./project.service.js";
import path from "path";
import fs from "fs";
import { exec, execFile } from "child_process";
import { promisify } from "util";

class AudioService {
  async getAudioInfo(filePath) {
    const metadata = await mm.parseFile(filePath);

    return {
      duration: metadata.format.duration ?? null,
      sampleRate: metadata.format.sampleRate ?? null,
      channels: metadata.format.numberOfChannels ?? null,
      bitrate: metadata.format.bitrate ?? null,
      codec: metadata.format.codec ?? null,
      container: metadata.format.container ?? null,
      codecProfile: metadata.format.codecProfile ?? null,
      lossless: metadata.format.lossless ?? null,
    };
  }

async convertToWav(projectPath) {
    const metadata = ProjectService.readMetadata(projectPath);

    const inputPath = path.join(projectPath, metadata.audio.original);
    const outputPath = path.join(projectPath, metadata.audio.wav);

    const execFileAsync = promisify(execFile);

    await execFileAsync("ffmpeg", [
        "-y",
        "-i",
        inputPath,
        "-acodec",
        "pcm_s16le",
        "-ar",
        "44100",
        "-ac",
        "2",
        outputPath
    ]);

    return outputPath;
}}
export default new AudioService();
