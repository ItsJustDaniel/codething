const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {
  const countries = await axios.get("https://api.printful.com/countries");
  console.log(countries);
  res.send(countries.data);
});

module.exports = router;
