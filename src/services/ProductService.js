const Product = require("../models/ProductModel");

const createProduct = async (newProduct) => {
  const { name } = newProduct;

  const checkProduct = await Product.exists({ name: name });
  if (checkProduct) {
    return {
      status: "OK",
      message: "The product name already exists",
    };
  }

  const createdProduct = await Product.create(newProduct);

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

const getAllProduct = async (limit, page, sort, filter) => {
  const query = {};
  let totalProduct;

  if (filter) {
    const [label, filterValue] = filter;
    query[label] = { $regex: filterValue, $options: "i" };
  }

  const findQuery = Product.find(query);

  if (sort) {
    const [sortField, sortOrder] = sort;
    findQuery.sort({ [sortField]: sortOrder });
  }

  if (limit && page) {
    const skipCount = page * limit;
    findQuery.skip(skipCount).limit(limit);
    totalProduct = await Product.countDocuments(query);
  }

  const allProduct = await findQuery;

  return {
    status: "OK",
    message: "Success",
    data: allProduct,
    total: totalProduct,
    pageCurrent: page ? Number(page + 1) : undefined,
    totalPage: limit ? Math.ceil(totalProduct / limit) : undefined,
  };
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};
