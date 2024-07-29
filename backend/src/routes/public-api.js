import express from "express";
import userController from "../controller/user-controller.js";

export const publicApi = new express.Router();

// public
publicApi.post("/api/lifenote/users", userController.register);
publicApi.get("/api/lifenote/users/verify-email", userController.verify);
publicApi.post("/api/lifenote/users/login", userController.login);
