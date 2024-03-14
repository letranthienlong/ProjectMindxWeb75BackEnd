const ProductService = require("../services/ProductService");

const createErrorResponse = (res, status, message) => {
  return res.status(status).json({
    status: "ERR",
    message: message,
  });
};

const createProduct = async (req, res) => {
  const { name, image, type, countInStock, price, rating } = req.body;

  if (!name || !image || !type || !countInStock || !price || !rating) {
    return createErrorResponse(res, 400, "All input fields are required");
  }

  try {
    const response = await ProductService.createProduct(req.body);
    return res.status(201).json(response);
  } catch (error) {
    return createErrorResponse(res, 500, error.message);
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const data = req.body;

  try {
    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (error) {
    return createErrorResponse(res, 500, error.message);
  }
};

const getDetailsProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return createErrorResponse(res, 500, error.message);
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return createErrorResponse(res, 500, error.message);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { limit = 10, page = 0, sort, filter } = req.query;
    const response = await ProductService.getAllProduct(
      Number(limit),
      Number(page),
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (error) {
    return createErrorResponse(res, 500, error.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};
