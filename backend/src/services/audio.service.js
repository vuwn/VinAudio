import * as mm from "music-metadata";

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
            lossless: metadata.format.lossless ?? null
        };

    }
}

export default new AudioService();