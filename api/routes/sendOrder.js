const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/", async (req, res) => {
  console.log("Got Body", req.body);

  const order = await axios
    .post(
      "https://api.printful.com/orders",
      {
        recipient: {
          name: req.body.name,
          address1: req.body.address,
          city: req.body.city,
          state_code: req.body.stateCode,
          country_code: req.body.countryCode,
          zip: req.body.zip,
        },
        items: req.body.fileIDs.map((file, i) => {
          return {
            quantity: 1,
            variant_id: req.body.variantIDs[i],
            files: [{ id: file }],
            options: [
              {
                id: "thread_colors",
                value: ["#FFFFFF"],
              },
            ],
          };
        }),
      },
      {
        headers: {
          Authorization: `Basic ${process.env.API_KEY_ENCODED}`,
        },
      }
    )
    .catch((error) => console.log(error.response.data));
  console.log(order.data);
  res.send(order.data);
});

module.exports = router;
