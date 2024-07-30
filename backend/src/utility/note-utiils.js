import { prismaClient } from "../app/database.js";

const findNote = async (user, id) => {
  const result = await prismaClient.note.findFirst({
    where: {
      username: user,
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      notetype: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const findAllNote = async (user) => {
  const result = await prismaClient.note.findMany({
    where: {
      username: user,
    },
    select: {
      id: true,
      title: true,
      description: true,
      notetype: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const createNote = async (data) => {
  const result = await prismaClient.note.create({
    data,
    select: {
      id: true,
      title: true,
      description: true,
      notetype: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateNote = async (user, id, data) => {
  const result = await prismaClient.note.update({
    where: {
      username: user,
      id,
    },
    data,
    select: {
      id: true,
      title: true,
      description: true,
      notetype: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const removeNote = async (user, id) => {
  const result = await prismaClient.note.delete({
    where: {
      username: user,
      id,
    },
  });
  return result;
};

export default {
  findNote,
  findAllNote,
  createNote,
  updateNote,
  removeNote,
};
