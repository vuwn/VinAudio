import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "src/uploads");
    },

    filename(req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allow = [
        "audio/mpeg",
        "audio/wav",
        "audio/x-wav",
        "audio/mp4",
    ];

    if (allow.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ cho phép file audio"));
    }
};

export default multer({
    storage,
    fileFilter,
});