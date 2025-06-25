import productModel from "../models/Product.js";
import { paginateQuery } from "../utils/pagination.utils.js";

export const getAllProducts = async (req, res) => {
  try {
    // const products = await productModel.find();
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const search = req.query.search || "";

    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    };

    const products = await paginateQuery(
      productModel,
      search ? searchQuery : {},
      { page, limit }
    );
    res.status(200).json({ status: "true", data: products });
  } catch (err) {
    res.status(500).json({ status: "false", message: err.message });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ status: "true", data: product });
  } catch (err) {
    res.status(500).json({ status: "false", message: err.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, category, inStock } = req.body;

  try {
    const newProduct = new productModel({ name, price, category, inStock });
    await newProduct.save();
    res.status(200).json({ status: "true", data: newProduct });
  } catch (err) {
    res.status(500).json({ status: "false", message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ status: "true", data: updatedProduct });
  } catch (err) {
    res.status(500).json({ status: "false", message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const id = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ status: "true", data: deletedProduct });
  } catch (err) {
    res.status(500).json({ status: "false", message: err.message });
  }
};
