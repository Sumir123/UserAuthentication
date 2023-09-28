const express = require("express");
const Product = require("../models/productSchema");
const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.status(200).send(products);
});

router.post("/products", async (req, res) => {
  const {
    name,
    description,
    price: rawPrice,
    stockQuantity: rawStockQuantity,
    category,
    imageUrl,
  } = req.body;

  const newProduct = {
    name,
    description,
    price: parseFloat(rawPrice),
    stockQuantity: parseInt(rawStockQuantity),
    category,
    imageUrl,
  };
  try {
    await Product.insertMany(newProdcut);
    res.status(200).render("index", { response: "Successfully posted" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
