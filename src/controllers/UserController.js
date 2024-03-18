const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const validateEmail = (email) => {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(email);
};

const validateUserInput = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({
      status: "ERR",
      message: "All input fields are required",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      status: "ERR",
      message: "Invalid email format",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "ERR",
      message: "Password and Confirm Password do not match",
    });
  }
};

const createUser = async (req, res) => {
  try {
    validateUserInput(req, res);

    const response = await UserService.createUser(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "ERR",
        message: "Email and password are required",
      });
    }

    const response = await UserService.loginUser(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const response = await UserService.updateUser(id, data);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await UserService.deleteUser(id);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await UserService.getDetailsUser(id);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.token.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        status: "ERR",
        message: "The token is required",
      });
    }

    const response = await JwtService.refreshTokenJwtService(token);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
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
