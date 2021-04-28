import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Products from "../components/Products";
import withContext from "../withContext";
import "./Home.scss";

const Home = (props) => {
  const { products, isLoading } = props.context;
  useEffect(() => {
    props.context.shouldNavPush();
  }, [props.context.navbarPush, props.context]);

  return (
    <div className="home-container">
      <Hero products={products} isLoading={isLoading} />
      <Products products={products} />
    </div>
  );
};

export default withContext(Home);
