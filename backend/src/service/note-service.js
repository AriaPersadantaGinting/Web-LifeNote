import noteValidation from "../validation/note-validation.js";
import { schemaValidate } from "../validation/validate.js";
import { ResponseError } from "../error/error-response.js";
import noteUtiils from "../utility/note-utiils.js";

const createNoteUserService = async (user, request) => {
  const note = await schemaValidate(
    noteValidation.createNoteUserValidation,
    request
  );
  note.username = user.username;
  let id = 0;
  const findNote = await noteUtiils.findNote(note.username, id);
  if (findNote) {
    throw new ResponseError(400, "note is already exists!");
  }
  return noteUtiils.createNote(note);
};

const getAllNoteUserService = async (user) => {
  const findAllNote = await noteUtiils.findAllNote(user);
  if (findAllNote.length === 0) {
    throw new ResponseError(404, "notes is nothink!");
  }
  return findAllNote;
};

const getNoteUserService = async (user, noteId) => {
  noteId = schemaValidate(noteValidation.getAllNoteUserValidation, noteId);
  const findNote = await noteUtiils.findNote(user, noteId);
  if (findNote.length === 0) {
    throw new ResponseError(404, "notes is nothink!");
  }
  return findNote;
};

const updateNoteUserService = async (user, request) => {
  const note = await schemaValidate(
    noteValidation.updateNoteUserValidation,
    request
  );
  const findNote = await noteUtiils.findNote(
    user.username,
    parseInt(note.id),
    10
  );
  if (!findNote) {
    throw new ResponseError(404, "note is not found!");
  }
  const { title, description, notetype } = note;
  const updateNote = {};
  if (title) updateNote.title = title;
  if (description) updateNote.description = description;
  if (notetype) updateNote.notetype = notetype;
  return noteUtiils.updateNote(
    user.username,
    parseInt(note.id, 10),
    updateNote
  );
};

const removeNoteUserService = async (user, noteId) => {
  noteId = await schemaValidate(
    noteValidation.getAllNoteUserValidation,
    noteId
  );
  const findNote = await noteUtiils.findNote(user.username, noteId);
  if (!findNote) {
    throw new ResponseError(404, "notes is nothink!");
  }
  return noteUtiils.removeNote(user.username, noteId);
};

export default {
  createNoteUserService,
  getAllNoteUserService,
  updateNoteUserService,
  getNoteUserService,
  removeNoteUserService,
};
