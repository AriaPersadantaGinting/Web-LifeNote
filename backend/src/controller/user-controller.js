import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.createRegisterUserService(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { token } = req.query;
    await userService.verifyRegisterUserService(token);
    res.status(200).json({
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.loginUserService(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await userService.getUserService(req.user.username);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await userService.updateUserService(req.user, req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logoutUserService(req.user.username);
    res.status(200).json({
      data: "logout user is successfully!.",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  verify,
  login,
  get,
  update,
  logout,
};
