const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const router = express.Router();
const bodyParser = require("body-parser");
const { google } = require("googleapis");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const CLIENT_ID =
  "1048735050363-9o4fhuc7gi0bssrnfpc0i9um99i37pdb.apps.googleusercontent.com";
const CLIENT_SECRET = "g6sPzVlnGm6rTtXioyfoBSsM";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04yAsOC-rKu_mCgYIARAAGAQSNwF-L9IraRimId-peq4-KKR5o9SgzVi5BjYrYnzAb_3NV_EhP_3K7WDj42O8cd_UmKRx_JR6rNQ";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken;

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "danielli12750@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
  } catch (err) {
    return err;
  }
}

router.post("/", async (req, res) => {
  console.log(req.body);
  console.log(process.env.EMAIL_PASS);
  console.log(req.body.email);
  const transporter = await sendMail();
  await console.log(transporter);
  const mailOptions = {
    from: `${req.body.name} ${req.body.email}`,
    to: "danielli12750@gmail.com",
    subject: `Message from ${req.body.name}: ${req.body.email}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("email sent: " + info.response);
      res.send("success");
    }
  });
});

module.exports = router;
