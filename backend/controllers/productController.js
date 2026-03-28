const pool = require("../config/db");
const { validateProduct } = require("../utils/validators");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const errorMessage = validateProduct(req.body);

    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const { name, price, description, image, category, stock } = req.body;

    const result = await pool.query(
      `INSERT INTO products (name, price, description, image, category, stock)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, price, description, image, category, stock]
    );

    res.status(201).json({
      message: "Product added successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const errorMessage = validateProduct(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const { name, price, description, image, category, stock } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name = $1, price = $2, description = $3, image = $4, category = $5, stock = $6
       WHERE id = $7
       RETURNING *`,
      [name, price, description, image, category, stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};