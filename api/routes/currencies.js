const express = require("express");
const router = express.Router();
const axios = require("axios");
const { map } = require("../app");

const endpoint = "latest";
const access_key = process.env.CURRENCY_KEY;

const getCurrency = async (symbol) => {
  const options = {
    method: "GET",
    params: { from: "AUD", to: symbol, amount: "1" },
    url: "https://currency-converter13.p.rapidapi.com/convert",
    headers: {
      "x-rapidapi-key": "cdd4b5a1f2mshbffa8f6b53a6379p12f70ajsn4f1defb84311",
      "x-rapidapi-host": "currency-converter13.p.rapidapi.com",
    },
  };

  try {
    return await axios.request(options).then(function (response) {
      console.log(response.data);
      return response;
    });
  } catch (err) {
    console.log(err);
  }
};

router.post("/", async (req, res) => {
  console.log("hi");
  console.log(req.body.symbol);
  const currency = await getCurrency(req.body.symbol);
  await console.log(currency);
  const status = 200;

  await res.send({
    status: 200,
    currencyRate: currency.data,
  });
});

module.exports = router;
