import express from "express";
import { publicApi } from "../routes/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import cors from "cors";
import { lifenoteApi } from "../routes/api.js";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(publicApi);
app.use(lifenoteApi);

app.use(errorMiddleware);
