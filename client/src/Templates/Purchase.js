import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import withContext from "../withContext";
import "./Purchase.scss";

const Purchase = (props) => {
  //properties of item

  const [variant, setVariant] = useState({
    name: "",
    size: "XS",
    variant_id: 0,
    price: 0,
    index: 0,
    id: 0,
  });
  const { products, isLoading, desc, price } = props.context;
  let { id } = useParams();
  console.log(products.length);

  useEffect(() => {
    console.log("repeat?");
    props.context.shouldNavPush();
    const sizeRegex = /[XS]+$|[S]+$|[M]+$|[L]+$|[XL]+$|[2XL]+$|[3XL]+$|[4XL]+$|/gi;

    if (!isLoading) {
      console.log("works");
      setVariant({
        name: products[id].sync_variants[0].product.name,
        size: products[id].sync_variants[0].name.match(sizeRegex).join(""),
        variant_id: products[id].sync_variants[0].variant_id,
        price: price[id][0],
        index: 0,
        id: products[id].sync_variants[0].files[0].id,
        productId: id,
      });
    }
  }, [id, isLoading, products, props.context]);
  const productDesc = desc[id].result.product.description;
  const sizeRegex = /[XS]+$|[S]+$|[M]+$|[L]+$|[XL]+$|[2XL]+$|[3XL]+$|[4XL]+$|/gi;

  return (
    <div className="purchase-container">
      <div className="purchase-card">
        <img
          className="purchase-image"
          src={products[id].sync_variants[0].files[1].preview_url}
          id={id}
          alt={products[id].sync_product.name}
        ></img>
        <div className="purchase-info">
          <h2 className="purchase-title">{variant.name}</h2>
          <p className="purchase-price">${variant.price}</p>
          <p className="purchase-desc">{productDesc}</p>
          <div className="purchase-sizeContainer">
            {products[id].sync_variants.map((i, index) => {
              let size = i.name.match(sizeRegex).join("");
              if (size === "") {
                return "";
              }

              return (
                <button
                  className={
                    index === variant.index
                      ? "purchase-size-buttonClick"
                      : "purchase-size"
                  }
                  onClick={() => {
                    setVariant(() => ({
                      name: i.product.name,
                      size: i.name.match(sizeRegex).join(""),
                      variant_id: i.variant_id,
                      price: price[id][index],
                      index: index,
                      id: i.files[0].id,
                      productId: id,
                    }));
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
          <button
            className="purchase-cart"
            onClick={() =>
              props.context.addToCart(
                id,
                variant.variant_id,
                variant.size,
                variant.price,
                variant.id,
                variant.productId,
                variant.index
              )
            }
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withContext(Purchase);
