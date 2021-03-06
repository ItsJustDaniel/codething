import React, { useState, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.scss";

const Payment = (props) => {
  const {
    Shipping,
    cart,
    User,
    paymentID,
    setPaymentID,
    setSlide,
    Slide,
    buttonLoading,
    setButtonLoading,
  } = props;
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [errElement, setErrElement] = useState({});

  const stripe = useStripe();
  const elements = useElements();

  const shippingCost = parseInt(
    Object.keys(Shipping).length !== 0 ? Shipping.rate : 0
  );

  useEffect(async () => {
    console.log(clientSecret);
    console.log(paymentID);
    const fetchData = async () => {
      const getClientSecret = await axios.post(
        "https://code-clothing.herokuapp.com/payment",
        {
          items: [
            {
              id: paymentID,
              amount:
                cart.reduce((a, b) => a + parseInt(b.price), 0) + shippingCost,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(getClientSecret);
      setClientSecret(getClientSecret.data.clientSecret);
      setPaymentID(getClientSecret.data.paymentIntentID);
    };

    fetchData();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        padding: " 0.5em",
        border: "solid 2px",
        borderRadius: "0.2em",
        "::placeholder": {},
      },
      invalid: {
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    console.log(event);
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    setErrElement({
      ...errElement,
      [event.elementType]: event.error ? event.error.message : "",
    });
  };

  const onPaymentSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    console.log(User.email);
    setButtonLoading(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      receipt_email: User.email,
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    if (payload.error) {
      console.log("fail");
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }

    const variantIDs = cart.map((item) => {
      return item.variantID;
    });

    const fileIDs = cart.map((item) => item.fileID);

    const sendOrder = await axios.post(
      "http://code-clothing.herokuapp.com/sendOrder",
      {
        ...User,
        variantIDs: variantIDs,
        fileIDs: fileIDs,
      }
    );
    setButtonLoading(false);
    await setSlide(Slide + 1);
  };

  return (
    <div className="form" onSubmit={onPaymentSubmit}>
      <form className="payment-form">
        <h1 className="payment-title">Payment</h1>
        <div className="form-contacts form-container">
          <label className="card-label">Card Number</label>
          <CardNumberElement
            className="card-element"
            options={cardStyle}
            id="card-number"
            onChange={handleChange}
            name="cardNumber"
          />
          {errElement.cardNumber && (
            <div className="card-error" role="alert">
              {errElement.cardNumber}
            </div>
          )}
          <div className="card-back">
            <div className="card-back-containers">
              <label className="card-label">Expiration</label>
              <CardExpiryElement
                id="card-expiry"
                options={cardStyle}
                className="card-element"
                onChange={handleChange}
                name="cardExp"
              />
              {errElement.cardExpiry && (
                <div className="card-error" role="alert">
                  {errElement.cardExpiry}
                </div>
              )}
            </div>
            <div className="card-back-containers">
              <label className="card-label">CVC</label>
              <CardCvcElement
                id="card-cvc"
                options={cardStyle}
                className="card-element"
                onChange={handleChange}
                name="cardCVC"
              />
              {errElement.cardCvc && (
                <div className="card-error" role="alert">
                  {errElement.cardCvc}
                </div>
              )}
            </div>
          </div>
        </div>
        <h5 className="payment-shipping">
          {Object.keys(Shipping).length !== 0 ? Shipping.name : <div></div>}
        </h5>
        <div className="checkout-buy-container">
          <button className="checkout-buy" id="submit">
            {buttonLoading ? (
              <div>
                Loading <i class="fa fa-circle-o-notch fa-spin"></i>
              </div>
            ) : (
              " Buy Now"
            )}
          </button>
        </div>
        {/* Show any error when processing payment*/}

        {/* Show sucess message if completed*/}
        {succeeded && (
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              {" "}
              Stripe dashboard.
            </a>{" "}
            Refresh the page to pay again.
          </p>
        )}
      </form>
    </div>
  );
};

export default Payment;
