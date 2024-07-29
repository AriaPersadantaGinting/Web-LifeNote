import userValidation from "../validation/user-validation.js";
import { schemaValidate } from "../validation/validate.js";
import { ResponseError } from "../error/error-response.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import userUtiils from "../utility/user-utiils.js";
import { prismaClient } from "../app/database.js";

const createRegisterUserService = async (request) => {
  const user = await schemaValidate(
    userValidation.createRegisterUserValidation,
    request
  );
  const { username, email } = user;
  let condition = {};
  if (username) condition.username = username;
  if (email) condition.email = email;
  const findUsername = await userUtiils.findUserByUsernameAndEmail(condition);
  if (findUsername) {
    throw new ResponseError(400, "username or email is already exists!");
  }
  const findUser = await userUtiils.findUser({ username, email });
  if (findUser) {
    throw new ResponseError(400, "username or email is already exists!");
  }
  user.password = await bcrypt.hash(user.password, 10);
  user.verificationToken = uuid().toString();
  user.verificationTokenExpires = new Date(Date.now() + 3600000);
  user.verified = false;
  const verificationUrl = `http://localhost:3000/api/lifenote/users/verify-email?token=${user.verificationToken}`;
  await userUtiils.transporter.sendMail({
    to: email,
    from: "persadanta13@gmail.com",
    subject: "Email Verification",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  });
  return userUtiils.createUser(user);
};

const verifyRegisterUserService = async (token) => {
  if (!token) {
    throw new ResponseError(400, "Verification token is required.");
  }
  const user = await userUtiils.findUserbyToken(token);
  if (!user) {
    throw new ResponseError(400, "Invalid or expired verification token.");
  }
  return userUtiils.updateUserToken(user.username);
};

const loginUserService = async (request) => {
  const user = await schemaValidate(
    userValidation.loginUserValidation,
    request
  );
  const { username, email } = user;
  if (!username && !email) {
    throw new ResponseError(400, "username or email is required!.");
  }
  let whereCondition = {};
  if (username) whereCondition.username = username;
  if (email) whereCondition.email = email;
  const findUser = await userUtiils.findUserByUsernameAndEmail(whereCondition);
  if (!findUser) {
    throw new ResponseError(404, "Username/Email or Password is wrong!");
  }
  const isPassword = await bcrypt.compare(user.password, findUser.password);
  if (!isPassword) {
    throw new ResponseError(404, "Username/Email or Password is wrong!");
  }
  const token = uuid().toString();
  let upToken = {};
  upToken.token = token;
  return userUtiils.updateUser(findUser.username, upToken);
};

// const getUserService = async (username) => {
//   username = await schemaValidate(userValidation.getUserValidation, username);
//   const where = {};
//   if (username) where.username = username;
//   const getUser = await userUtiils.findUser(where);
//   if (!getUser) {
//     throw new ResponseError(404, "User not found!");
//   }
//   return getUser;
// };
const getUserService = async (username) => {
  const { username: validatedUsername } = await schemaValidate(
    userValidation.getUserValidation,
    { username }
  );
  const user = await userUtiils.findUser({ username: validatedUsername });
  if (!user) {
    throw new ResponseError(404, "User not found!");
  }
  return user;
};

const updateUserService = async (currentUser, request) => {
  const user = await schemaValidate(
    userValidation.updateUserValidation,
    request
  );
  const { username, password } = user;
  let updateUser = {};
  if (username) updateUser.username = username;
  if (password) updateUser.password = await bcrypt.hash(password, 10);
  return userUtiils.updateDataUser(currentUser.username, updateUser);
};

const logoutUserService = async (username) => {
  username = await schemaValidate(userValidation.getUserValidation, username);
  let dataUpdate = {};
  dataUpdate.token = null;
  return userUtiils.updateUser(username, dataUpdate);
};

export default {
  createRegisterUserService,
  verifyRegisterUserService,
  loginUserService,
  getUserService,
  updateUserService,
  logoutUserService,
};
