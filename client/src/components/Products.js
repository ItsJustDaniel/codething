import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const Products = ({ products, navbarPush, price }) => {
  return (
    <div className="products">
      <h1 className="Products-title">Products</h1>
      <div className="Products-Container">
        {products.map((item, i) => {
          return (
            <div className="product" key={i}>
              <Link to={`/products/${i}`}>
                <img
                  className="product-image"
                  src={item.sync_variants[0].files[1].thumbnail_url}
                  id={i}
                  alt={item.sync_product.name}
                ></img>
              </Link>
              <h3 className="product-text">{item.sync_product.name}</h3>
              <h3 className="product-price">
                ${price[i][1] ? price[i][1] : price[i][0]}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
