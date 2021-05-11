import React, { useEffect } from "react";
import withContext from "../withContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import "./Cart.scss";

const Cart = (props) => {
  const { cart, products, price } = props.context;
  console.log(cart);
  useEffect(() => {
    props.context.shouldNavPush();
  }, [props.context.shouldNavPush, props.context]);

  if (!cart.length) {
    return (
      <div className="cartEmpty-container">
        <h3>Your Cart is empty</h3>
        <Link to="/">Go Back To Shopping</Link>
      </div>
    );
  }
  return (
    <div className="cart-container">
      <ul className="cart-list">
        {cart.map((item, i) => {
          console.log(i);
          return (
            <CartItem
              id={item.id}
              variantID={item.variantID}
              size={item.size}
              price={price[item.productId][item.variantIndex]}
              products={products}
              index={i}
              removeFromCart={props.context.removeFromCart}
            />
          );
        })}
      </ul>
      <div className="checkout-container">
        <Link className="checkout" to="/checkout">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default withContext(Cart);
