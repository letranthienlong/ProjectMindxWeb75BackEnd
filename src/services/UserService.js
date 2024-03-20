const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./JwtService");

const createUser = async (newUser) => {
  const { email, password } = newUser;
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser !== null) {
      return {
        status: "ERR",
        message: "The email is already registered",
      };
    }

    const hash = bcrypt.hashSync(password, 10);
    const createdUser = await User.create({
      email,
      password: hash,
    });

    return {
      status: "OK",
      message: "SUCCESS",
      data: createdUser,
    };
  } catch (e) {
    throw e;
  }
};

const loginUser = async (userLogin) => {
  const { email, password } = userLogin;
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser === null) {
      return {
        status: "ERR",
        message: "User not found",
      };
    }

    const comparePassword = bcrypt.compareSync(password, checkUser.password);
    if (!comparePassword) {
      return {
        status: "ERR",
        message: "Incorrect password",
      };
    }

    const access_token = await generateAccessToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });

    const refresh_token = await generateRefreshToken({
      id: checkUser.id,
      isAdmin: checkUser.isAdmin,
    });

    return {
      status: "OK",
      message: "SUCCESS",
      access_token,
      refresh_token,
    };
  } catch (e) {
    throw e;
  }
};

const updateUser = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) {
      return {
        status: "ERR",
        message: "User not found",
      };
    }

    return {
      status: "OK",
      message: "SUCCESS",
      data: updatedUser,
    };
  } catch (e) {
    throw e;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return {
        status: "ERR",
        message: "User not found",
      };
    }

    return {
      status: "OK",
      message: "User deleted successfully",
    };
  } catch (e) {
    throw e;
  }
};

const getAllUser = async () => {
  try {
    const allUser = await User.find();
    return {
      status: "OK",
      message: "Success",
      data: allUser,
    };
  } catch (e) {
    throw e;
  }
};

const getDetailsUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return {
        status: "ERR",
        message: "User not found",
      };
    }

    return {
      status: "OK",
      message: "SUCCESS",
      data: user,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
};
