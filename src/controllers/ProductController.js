const ProductService = require("../services/ProductService");

const createErrorResponse = (res, status, message) => {
  return res.status(status).json({
    status: "ERR",
    message: message,
  });
};

const createProduct = async (req, res) => {
  try {
    const { name, image, type, countInStock, price, rating, description } =
      req.body;

    if (!name || !image || !type || !countInStock || !price || !rating) {
      return createErrorResponse(res, 200, "All input fields are required");
    }

    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return createErrorResponse(res, 404, e);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;

    const response = await ProductService.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return createErrorResponse(res, 404, e);
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return createErrorResponse(res, 404, e);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return createErrorResponse(res, 404, e);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const response = await ProductService.getAllProduct();
    return res.status(200).json(response);
  } catch (e) {
    return createErrorResponse(res, 404, e);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
};
