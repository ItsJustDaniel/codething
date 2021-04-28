import React from "react";
import "./CartItem.scss";

const CartItem = ({ id, products, index, removeFromCart, price, size }) => {
  return (
    <li className="cartItem-container">
      <div className="cartItem-left">
        <img
          src={products[id].sync_variants[0].files[1].thumbnail_url}
          className="cartItem-image"
          alt={products[id].sync_product.name}
        />
        <div>
          <h3 className="cartItem-name cartItem-desc">
            {products[id].sync_product.name}
          </h3>
          <h3 className="cartItem-desc">Size: {size}</h3>
          <h3 className="cartItem-price cartItem-desc">${price}</h3>
        </div>
      </div>
      <div className="cartItem-right">
        <button
          onClick={() => removeFromCart(index)}
          className="cartItem-remove-container"
        >
          <h3 className="cartItem-remove">Remove</h3>
        </button>
      </div>
    </li>
  );
};

export default CartItem;
