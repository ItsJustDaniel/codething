const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const request = [
  `https://api.printful.com/products/variant/9527`,
  `https://api.printful.com/products/variant/7854`,
  `https://api.printful.com/products/variant/9679`,
];

const productAuth = axios.create({
  headers: {
    Authorization: `Basic ${process.env.API_KEY_ENCODED}`,
  },
});

const productOne = productAuth.get(request[0]);
const productTwo = productAuth.get(request[1]);
const productThree = productAuth.get(request[2]);

async function getProductsDesc(...products) {
  try {
    return await Promise.all(products);
  } catch (error) {
    console.log(error);
  }
}

router.get("/", async (req, res) => {
  const desc = await getProductsDesc(productOne, productTwo, productThree);
  const descData = desc.map((item) => {
    return item.data;
  });
  res.send(descData);
});

module.exports = router;
