import noteService from "../service/note-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await noteService.createNoteUserService(user, request);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const gets = async (req, res, next) => {
  try {
    const user = req.user.username;
    const result = await noteService.getAllNoteUserService(user);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user.username;
    const paramId = req.params.paramId;
    const result = await noteService.getNoteUserService(user, paramId);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const paramId = req.params.paramId;
    const request = req.body;
    request.id = paramId;
    const result = await noteService.updateNoteUserService(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const paramId = req.params.paramId;
    console.info(paramId);
    await noteService.removeNoteUserService(user, paramId);
    res.status(200).json({
      data: "remove note is succesfully!",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  gets,
  update,
  remove,
};
