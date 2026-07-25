import express from "express";
import router from "./routes/system.route.js";
import uploadRoute from "./routes/upload.route.js";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/api", uploadRoute);

app.use("/uploads", express.static("src/uploads"));

app.use(errorHandler);


export default app;