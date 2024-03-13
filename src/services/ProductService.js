const Product = require("../models/ProductModel");

const createProduct = async (newProduct) => {
  const { name, image, type, countInStock, price, rating, description } =
    newProduct;
  try {
    const checkProduct = await Product.findOne({ name: name });
    if (checkProduct !== null) {
      return {
        status: "OK",
        message: "The product name already exists",
      };
    }

    const createdProduct = await Product.create({
      name,
      image,
      type,
      countInStock,
      price,
      rating,
      description,
    });

    return {
      status: "OK",
      message: "SUCCESS",
      data: createdProduct,
    };
  } catch (e) {
    throw e;
  }
};

const updateProduct = async (id, data) => {
  try {
    const checkProduct = await Product.findOne({ _id: id });
    if (checkProduct === null) {
      return {
        status: "OK",
        message: "The product is not defined",
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      status: "OK",
      message: "SUCCESS",
      data: updatedProduct,
    };
  } catch (e) {
    throw e;
  }
};

const deleteProduct = async (id) => {
  try {
    const checkProduct = await Product.findOne({ _id: id });
    if (checkProduct === null) {
      return {
        status: "OK",
        message: "The product is not defined",
      };
    }

    await Product.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Product deleted successfully",
    };
  } catch (e) {
    throw e;
  }
};

const getDetailsProduct = async (id) => {
  try {
    const product = await Product.findOne({ _id: id });
    if (product === null) {
      return {
        status: "OK",
        message: "The product is not defined",
      };
    }

    return {
      status: "OK",
      message: "SUCCESS",
      data: product,
    };
  } catch (e) {
    throw e;
  }
};

const getAllProduct = async () => {
  try {
    const allProduct = await Product.find();
    return {
      status: "OK",
      message: "Success",
      data: allProduct,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};
