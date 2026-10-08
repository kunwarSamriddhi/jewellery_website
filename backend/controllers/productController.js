const Product = require("../models/Product");

// =====================================
// CREATE PRODUCT - ADMIN ONLY
// =====================================

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      image,
    } = req.body;

    // Validate required fields
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({
        message: "Name, price and stock are required",
      });
    }

    // Validate price
    if (price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    // Validate stock
    if (stock < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};


// =====================================
// GET ALL PRODUCTS - PUBLIC
// =====================================

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
};


// =====================================
// GET SINGLE PRODUCT - PUBLIC
// =====================================

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      message: "Failed to get product",
      error: error.message,
    });
  }
};


// =====================================
// UPDATE PRODUCT - ADMIN ONLY
// =====================================

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      name,
      description,
      price,
      stock,
      category,
      image,
    } = req.body;

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Validate price
    if (price !== undefined && price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }

    // Validate stock
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    // Update only fields that were provided
    if (name !== undefined) {
      product.name = name;
    }

    if (description !== undefined) {
      product.description = description;
    }

    if (price !== undefined) {
      product.price = price;
    }

    if (stock !== undefined) {
      product.stock = stock;
    }

    if (category !== undefined) {
      product.category = category;
    }

    if (image !== undefined) {
      product.image = image;
    }

    // Save updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};


// =====================================
// DELETE PRODUCT - ADMIN ONLY
// =====================================

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};