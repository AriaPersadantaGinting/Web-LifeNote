import { prismaClient } from "../app/database.js";
import nodemailer from "nodemailer";
import "dotenv/config";

// dotenv.config();
const findUser = async (condition) => {
  const result = await prismaClient.user.findFirst({
    where: condition,
    select: {
      username: true,
      email: true,
      createdAt: true,
    },
  });
  return result;
};

const findUserByUsernameAndEmail = async (condition) => {
  const result = await prismaClient.user.findFirst({
    where: {
      OR: [{ username: condition.username }, { email: condition.email }],
    },
    select: {
      username: true,
      email: true,
      password: true,
      createdAt: true,
    },
  });
  return result;
};

const createUser = async (data) => {
  const result = await prismaClient.user.create({
    data,
    select: {
      username: true,
      email: true,
      createdAt: true,
    },
  });
  return result;
};

const updateUser = async (username, data) => {
  const result = await prismaClient.user.update({
    where: {
      username,
    },
    data,
    select: {
      token: true,
    },
  });
  return result;
};

const loginUser = async (username, token) => {
  const result = await prismaClient.user.update({
    where: {
      username,
    },
    data: {
      token,
    },
    select: {
      token: true,
    },
  });
  return loginUser;
};

const logoutUser = async (username) => {
  return await prismaClient.user.delete({
    where: {
      username,
    },
  });
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "persadanta13@gmail.com",
    pass: "ackrzzgtcxjgpbhb",
  },
});

const findUserbyToken = async (token) => {
  const result = await prismaClient.user.findFirst({
    where: {
      verificationToken: token,
      verificationTokenExpires: { gt: new Date() },
    },
  });
  return result;
};

const updateUserToken = async (username) => {
  const result = await prismaClient.user.update({
    where: {
      username,
    },
    data: {
      verificationToken: null,
      verificationTokenExpires: null,
    },
    select: {
      token: true,
    },
  });
  return result;
};

const updateDataUser = async (username, data) => {
  const result = await prismaClient.user.update({
    where: {
      username,
    },
    data,
    select: {
      username: true,
      email: true,
    },
  });
  return result;
};

export default {
  findUser,
  createUser,
  updateUser,
  logoutUser,
  transporter,
  findUserbyToken,
  updateUserToken,
  findUserByUsernameAndEmail,
  updateDataUser,
};
