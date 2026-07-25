import express from "express";
import uploadRoute from "./routes/upload.route.js";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";
import projectRoute from "./routes/project.route.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute);

app.use("/uploads", express.static("src/uploads"));

app.use("/api/projects", projectRoute);

app.use(errorHandler);


export default app;