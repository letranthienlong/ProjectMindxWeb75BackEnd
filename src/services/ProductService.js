const Product = require("../models/ProductModel");

const createProduct = async (newProduct) => {
  const { name, image, type, countInStock, price, rating, description } =
    newProduct;

  const checkProduct = await Product.exists({ name: name });
  if (checkProduct) {
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
};

const updateProduct = async (id, data) => {
  const checkProduct = await Product.exists({ _id: id });
  if (!checkProduct) {
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
};

const deleteProduct = async (id) => {
  const checkProduct = await Product.exists({ _id: id });
  if (!checkProduct) {
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
};

const getDetailsProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
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
};

const getAllProduct = async (limit = 8, page = 0) => {
  const totalProduct = await Product.countDocuments();
  const allProduct = await Product.find()
    .limit(limit)
    .skip(page * limit);

  return {
    status: "OK",
    message: "Success",
    data: allProduct,
    total: totalProduct,
    pageCurrent: Number(page + 1),
    totalPage: Math.ceil(totalProduct / limit),
  };
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};
