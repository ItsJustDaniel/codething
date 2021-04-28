import React from "react";
import "./orderSummary.css";

const OrderSummary = (props) => {
  const { products, cart, shipping } = props;
  const shippingCost = parseInt(
    Object.keys(shipping).length !== 0 ? shipping.rate : 0
  );
  console.log(cart);
  return (
    <div className="orderSummary-container">
      <h4 className="orderSummary-title">Order Summary</h4>
      <div className="orderSummary-content">
        <div className="orderSummary-items-container">
          <h5>Items</h5>
          <ul className="orderSummary-list">
            {cart.map((item, id) => {
              return (
                <li className="orderSummary-item">
                  <div className="orderSummmary-item-left">
                    <img
                      alt={products[item.id].sync_product.name}
                      src={
                        products[item.id].sync_variants[0].files[1]
                          .thumbnail_url
                      }
                      className="item-image"
                    ></img>
                  </div>
                  <div className="orderSummary-item-right">
                    <h6 className="orderSummary-item-title">
                      {products[item.id].sync_product.name}
                    </h6>
                    <div className="orderSummary-item-info">
                      <h6>${item.price}</h6>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="orderSummary-subheadings-container">
          <h6 className="orderSummary-subtotal orderSummary-subheading">
            Subtotal: ${cart.reduce((a, b) => a + parseInt(b.price), 0)}
          </h6>
          <h6 className="orderSummary-shipping orderSummary-subheading">
            Shipping:‎‏‏‎ ‎
            {Object.keys(shipping).length !== 0 ? (
              <div className="orderSummary-shipCost"> ${shippingCost}</div>
            ) : (
              <div>{"    "}Calculated at next step</div>
            )}
          </h6>
        </div>
        <h5 className="orderSummary-total">
          Total:
          {shippingCost
            ? " $" +
              (cart.reduce((a, b) => {
                return a + parseInt(b.price);
              }, 0) +
                shippingCost)
            : " Calculated at next step"}
        </h5>
      </div>
    </div>
  );
};

export default OrderSummary;
