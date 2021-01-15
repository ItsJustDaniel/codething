import React from "react";
import "./Products.css";

const Products = ({ products }) => {
  return (
    <div>
      <h1 className="Products-title">Products</h1>
      <div className="Products-Container">
        {products.map((item, i) => {
          return (
            <div className="product">
              <img
                className="product-image"
                src={item.sync_variants[0].files[1].thumbnail_url}
                id={i}
                alt={item.sync_product.name}
              ></img>
              <h3 className="product-text">{item.sync_product.name}</h3>
              <h3 className="product-price">
                ${item.sync_variants[0].retail_price}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
