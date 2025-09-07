import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all product fields." });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "There is no product with such id..." });
    }
    try {
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "There is no product with such id..." });
        }
        return res.status(200).json({ success: true, data: { _id: id } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "There is no product with such id..." });
    }
    try {
        const updated = await Product.findByIdAndUpdate(id, product, { new: true, runValidators: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "There is no product with such id..." });
        }
        return res.status(200).json({ success: true, data: updated });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
