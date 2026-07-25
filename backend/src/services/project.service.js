import fs from "fs";
import path from "path";

class ProjectService {
        
    async createProject(fileInfo) {

        const uploadPath = path.join(process.cwd(), "src", "uploads");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        const projects = fs
        .readdirSync(uploadPath)
            .filter((item) =>
                fs.statSync(path.join(uploadPath, item)).isDirectory()
            );

        const nextProjectId = `project_${String(projects.length + 1).padStart(6, "0")}`;

        const projectPath = path.join(uploadPath, nextProjectId);
        fs.mkdirSync(projectPath);
        
        this.createProjectStructure(projectPath);

        this.createMetadata(projectPath, nextProjectId, fileInfo);

        this.createNotes(projectPath);

        return {
        projectId: nextProjectId,
        projectPath
        };
    }

    createProjectStructure(projectPath) {
        const folders = ["audio", "renders", "stems", "cache"];

            folders.forEach((folderName) => {

                const folderPath = path.join(projectPath, folderName);

                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }

            });

    }

    createMetadata(projectPath, projectId, fileInfo) {

        const metadata = {
            id: projectId,
            status: "uploaded",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            audio: {
                original: "audio/original.mp3",
                originalName: fileInfo.originalname,
                wav: "audio/original.wav",
                info: {
                        duration: null,
                        sampleRate: null,
                        channels: null,
                        bitrate: null,
                        codec: null,
                        container: null
                }
            },
            analysis: {
                tempo: null,
                key: null,
                notes: false,
                waveform: false
            }
        }
            
        const metadataPath = path.join(projectPath, "metadata.json");
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    }

    createNotes(projectPath) {

        const notes = {
            notes: []
        };
        
        const notesPath = path.join(projectPath, "notes.json");
        fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));

    }

    updateMetadata(projectPath, data) {

        const metadataPath = path.join(projectPath, "metadata.json");
        const content = fs.readFileSync(metadataPath, "utf-8"); 
        const metadata = JSON.parse(content);

        metadata.audio.info = {
            ...metadata.audio.info,
            ...data
        };

        metadata.updatedAt = new Date().toISOString();
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        
    }


}



export default new ProjectService();