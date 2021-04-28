const express = require("express");
const app = express();
const router = express.Router();
const util = require("util");

const bodyParser = require("body-parser");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = (amount) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return amount * 100;
};

router.post("/", async (req, res) => {
  const { items } = req.body;
  console.log(items);
  let paymentIntent;
  if (items[0].id.length < 1) {
    paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items[0].amount),
      currency: "aud",
      payment_method_types: ["card"],
    });
  } else {
    console.log("updating...");
    paymentIntent = await stripe.paymentIntents.update(items[0].id, {
      amount: calculateOrderAmount(items[0].amount),
      currency: "aud",
    });
    console.log("updated");
  }

  // await console.log(`Got Body ${util.inspect(paymentIntent)}`);
  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntentID: paymentIntent.id,
  });
});

module.exports = router;
