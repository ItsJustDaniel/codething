import React, { useState, useEffect } from "react";
import withContext from "../withContext";
import axios from "axios";
import "./Checkout.scss";
import Payment from "../components/Payment";
import Loader from "../components/Loader";
import Information from "../components/Information";
import OrderSummary from "../components/orderSummary";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Success from "../components/Success";
import { Link } from "react-router-dom";
import Breadcumb from "../components/Breadcumb";

const promise = loadStripe(
  "pk_test_51IKKEMFzUPAYUCAB5XeAMy8MxjkatUcWhlEmmDh0wLqiiKbyY6qLKtGZA8DK08eV3Z6E1uVjiW66gaM7sVAbn52400YjHQ4d4j"
);

const Checkout = (props) => {
  const [Slide, setSlide] = useState(1);
  const [User, setUser] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    address2: "",
    city: "",
    countryCode: "US",
    stateCode: "",
    zip: "",
  });
  const [Shipping, setShipping] = useState({});
  const [Loading, setLoading] = useState(false);
  const [information, setInformation] = useState(false);

  const { countries, cart, products, paymentID, setPaymentID } = props.context;
  useEffect(() => {
    props.context.shouldNavPush();
    console.log("repeat?");
  }, []);

  const onInputChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
    console.log(User);
  };

  const onShippingClick = async () => {
    const variantIDs = cart.map((item) => {
      return item.variantID;
    });
    setLoading(true);
    const sendShipping = await axios.post(
      "https://code-clothing.herokuapp.com/shippingRates",
      {
        ...User,
        variantIDs: variantIDs,
      }
    );
    await setLoading(false);
    await console.log(sendShipping.data.result);
    setShipping(...sendShipping.data.result);
    setSlide(Slide + 1);
    setInformation(true);
  };

  if (Loading === true) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }
  if (!cart.length) {
    return (
      <div className="cartEmpty-container">
        <h3>Your Cart is empty</h3>
        <Link to="/">Go Back To Shopping</Link>
      </div>
    );
  }
  return (
    <div className="checkout-container">
      <div>
        <Breadcumb
          information={information}
          Slide={Slide}
          setSlide={setSlide}
        />
        {Slide === 1 ? (
          <Information
            onInputChange={onInputChange}
            countries={countries}
            User={User}
            onShippingClick={onShippingClick}
          />
        ) : Slide === 2 ? (
          <Elements stripe={promise}>
            <Payment
              Shipping={Shipping}
              cart={cart}
              User={User}
              paymentID={paymentID}
              setPaymentID={setPaymentID}
              setSlide={setSlide}
              Slide={Slide}
            />
          </Elements>
        ) : (
          <Success Shipping={Shipping} />
        )}
      </div>
      <OrderSummary products={products} cart={cart} shipping={Shipping} />
    </div>
  );
};

export default withContext(Checkout);
