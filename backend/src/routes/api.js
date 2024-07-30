import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import noteController from "../controller/note-controller.js";

export const lifenoteApi = new express.Router();
lifenoteApi.use(authMiddleware);

// api user
lifenoteApi.get("/api/lifenote/users/current", userController.get);
lifenoteApi.patch("/api/lifenote/users/current", userController.update);
lifenoteApi.delete("/api/lifenote/users/current", userController.logout);

// api note
lifenoteApi.post("/api/lifenote/notes", noteController.create);
lifenoteApi.get("/api/lifenote/notes", noteController.gets);
lifenoteApi.get("/api/lifenote/notes/:paramId", noteController.get);
lifenoteApi.put("/api/lifenote/notes/:paramId", noteController.update);
lifenoteApi.delete("/api/lifenote/notes/:paramId", noteController.remove);
