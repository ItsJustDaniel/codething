var express = require("express");
var router = express.Router();
const axios = require("axios");
const { get } = require(".");
const { parse, stringify } = require("flatted");

const token = "0i1brqsd-4y3i-m8rm:r9l9-hy6c2yuw65k9";
const encoded = "MGkxYnJxc2QtNHkzaS1tOHJtOnI5bDktaHk2YzJ5dXc2NWs5";

async function getProducts() {
  try {
    return await axios.get("https://api.printful.com/store/products", {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function useProducts() {
  const data = await getProducts();
  return data;
}

async function getAllProducts(...products) {
  try {
    return await Promise.all(products);
  } catch (error) {
    console.log(error);
  }
}

router.get("/", async function (req, res, next) {
  const ID = await useProducts();
  const request = [
    `https://api.printful.com/store/products/${ID.data.result[0].id}`,
    `https://api.printful.com/store/products/${ID.data.result[1].id}`,
    `https://api.printful.com/store/products/${ID.data.result[2].id}`,
  ];

  const productAuth = axios.create({
    headers: {
      Authorization: `Basic ${encoded}`,
    },
  });
  const productOne = productAuth.get(request[0]);
  const productTwo = productAuth.get(request[1]);
  const productThree = productAuth.get(request[2]);

  const products = await getAllProducts(productOne, productTwo, productThree);
  const productData = products.map((item) => {
    return item.data.result;
  });
  console.log(productData);
  res.send(productData);
});

module.exports = router;
