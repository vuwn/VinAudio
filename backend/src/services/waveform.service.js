import fs from "fs";
import path from "path";
import ProjectService from "../services/project.service.js";

class WaveFormService {
  generate(projectPath) {
    const metadata = ProjectService.readMetadata(projectPath);

    const wavPath = path.join(projectPath, metadata.audio.wav);
    if (!fs.existsSync(wavPath)) {
      throw new Error("WAV file not found");
    }

    const buffer = fs.readFileSync(wavPath);

    const pcm = buffer.subarray(44);

    const samples = [];

    for (let i = 0; i < pcm.length; i += 2) {
      const sample = pcm.readInt16LE(i);
      samples.push(sample / 32768);
    }

    const waveform = this.generateWaveform(samples);

    const waveformPath = path.join(projectPath, "waveform.json");
    fs.writeFileSync(waveformPath, JSON.stringify(waveform, null, 2));
  }

  generateWaveform(samples, blockSize = 1024) {
    const waveform = [];

    for (let i = 0; i < samples.length; i += blockSize) {
      let min = 1;
      let max = -1;

      const end = Math.min(i + blockSize, samples.length);

      for (let j = i; j < end; j++) {
        const sample = samples[j];

        if (sample < min) min = sample;
        if (sample > max) max = sample;
      }

      waveform.push({
        min,
        max,
      });
    }

    return waveform;
  }
}
export default new WaveFormService();
