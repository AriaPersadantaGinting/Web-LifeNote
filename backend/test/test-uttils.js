import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

const createUserTest = async () => {
  const result = await prismaClient.user.create({
    data: {
      username: "example",
      email: `example ${Math.random() * 5}1@gmail.com`,
      password: await bcrypt.hash("example", 10),
      token: "token",
    },
  });
  return result;
};

const createUserTestByParameter = async (username) => {
  const result = await prismaClient.user.create({
    data: {
      username: username,
      email: `example ${Math.random() * 5}1@gmail.com`,
      password: await bcrypt.hash("example", 10),
      token: "token",
    },
  });
  return result;
};

const removeUserTest = async () => {
  const result = await prismaClient.user.delete({
    where: {
      username: "example",
    },
  });
  return result;
};

const getUserTest = async (user) => {
  const findUser = await prismaClient.user.findFirst({
    where: {
      username: user,
    },
    select: {
      username: true,
    },
  });
  return findUser;
};

export default {
  createUserTest,
  removeUserTest,
  getUserTest,
  createUserTestByParameter,
};
