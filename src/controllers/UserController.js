const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const validateEmail = (email) => {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(email);
};

const validateUserInput = (req, res) => {
  const { name, email, password, confirmPassword, phone } = req.body;

  if (!name || !email || !password || !confirmPassword || !phone) {
    return res.status(200).json({
      status: "ERR",
      message: "All input fields are required",
    });
  } else if (!validateEmail(email)) {
    return res.status(200).json({
      status: "ERR",
      message: "Invalid email format",
    });
  } else if (password !== confirmPassword) {
    return res.status(200).json({
      status: "ERR",
      message: "Password and Confirm Password do not match",
    });
  }

  return null;
};

const createUser = async (req, res) => {
  try {
    const validationError = validateUserInput(req, res);
    if (validationError) {
      return validationError;
    }

    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const validationError = validateUserInput(req, res);
    if (validationError) {
      return validationError;
    }

    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];

    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }

    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
};
