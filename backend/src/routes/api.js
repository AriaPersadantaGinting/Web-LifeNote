import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

export const lifenoteApi = new express.Router();
lifenoteApi.use(authMiddleware);

// api
lifenoteApi.get("/api/lifenote/users/current", userController.get);
lifenoteApi.patch("/api/lifenote/users/current", userController.update);
lifenoteApi.delete("/api/lifenote/users/current", userController.logout);
