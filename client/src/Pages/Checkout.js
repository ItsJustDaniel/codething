import React, { useState, useEffect, useRef } from "react";
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
    fullName: "",
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  const {
    countries,
    cart,
    products,
    paymentID,
    setPaymentID,
    price,
    currencyRate,
  } = props.context;
  useEffect(() => {
    props.context.shouldNavPush();
    console.log("repeat?");
  }, []);

  const fieldValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
      return `${fieldName} is required`;
    }

    return null;
  };

  const zipValidation = (zipValue) => {
    const regexZip = /^[0-9]*$/;

    if (zipValue.trim() === "") {
      return "zip is required";
    }
    console.log(regexZip.test(zipValue.trim()));
    if (!regexZip.test(zipValue.trim())) {
      return "zip must be a number";
    }
  };

  const validate = {
    fullName: (field) => fieldValidation("Full Name", field),
    address: (field) => fieldValidation("address", field),
    City: (field) => fieldValidation("City", field),
    zip: zipValidation,
  };

  //change event handler
  const onInputChange = (e) => {
    const { name, value: newValue, type } = e.target;

    const value = type === "number" ? +newValue : newValue;

    setUser({ ...User, [name]: value });
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //function that handles validate logic
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });
    const { [name]: removedError, ...rest } = errors;
    console.log(name);
    console.log(touched[name]);
    console.log(value);
    const error = validate[name](value);

    console.log(error);
    setErrors({
      ...rest,
      ...(error && { [name]: error }),
    });
  };

  const onShippingSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    const variantIDs = cart.map((item) => {
      return item.variantID;
    });
    const sendShipping = await axios.post(
      "https://code-clothing.herokuapp.com/shippingRates",
      {
        ...User,
        variantIDs: variantIDs,
      }
    );
    setButtonLoading(false);
    await console.log(sendShipping.data.result);
    setShipping(...sendShipping.data.result);
    setSlide(Slide + 1);
    setInformation(true);
  };

  //validate when clicked

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
            onShippingSubmit={onShippingSubmit}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            buttonLoading={buttonLoading}
            setButtonLoading={setButtonLoading}
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
              buttonLoading={buttonLoading}
              setButtonLoading={setButtonLoading}
            />
          </Elements>
        ) : (
          <Success Shipping={Shipping} />
        )}
      </div>
      <OrderSummary
        products={products}
        cart={cart}
        shipping={Shipping}
        price={price}
        currencyRate={currencyRate}
      />
    </div>
  );
};

export default withContext(Checkout);
