const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const dotenv = require("dotenv");
const { route } = require("./test");
const { default: axios } = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/", async (req, res) => {
  console.log("Got Body", req.body);
  const rates = await axios.post(
    "https://api.printful.com/shipping/rates",
    {
      recipient: {
        address1: req.body.address,
        city: req.body.city,
        country_code: req.body.countryCode,
        state_code: req.body.stateCode,
        zip: req.body.zip,
      },
      items: req.body.variantIDs.map((id) => {
        return { quantity: 1, variant_id: id };
      }),
    },
    {
      headers: {
        Authorization: `Basic ${process.env.API_KEY_ENCODED}`,
      },
    }
  );
  res.send(rates.data);
});

module.exports = router;
