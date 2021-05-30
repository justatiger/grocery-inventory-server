import express from "express";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

const router = express.Router();

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, quantity, imageUrl } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    quantity,
    imageUrl,
  });

  try {
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send(`No Product with id: ${id}`);
  }

  await Product.findByIdAndRemove(id);

  res.json({ message: "Product deleted successfully." });
};

export const deleteMultiProduct = async (req, res) => {
  if (req.body.length > 0) {
    await Product.deleteMany({
      _id: {
        $in: req.body,
      },
    });
    res.json({ message: "Products are deleted successfully." });
  } else {
    res.status(400).json({ message: "No Ids found" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, imageUrl } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "No Ids found" });
  }

  const updatedProduct = {
    name,
    description,
    price,
    quantity,
    imageUrl,
    _id: id,
  };

  await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

  res.json(updatedProduct);

  // const existProduct = await Prodcut.findById(id);
  // existProduct.name = name || existProduct.name;
  // existProduct.description = description || existProduct.description;
  // existProduct.price = price || existProduct.price;
  // existProduct.quantity = quantity || existProduct.quantity;
  // existProduct.imageUrl = imageUrl || existProduct.imageUrl;
};

export default router;
