import React from "react";
import Hero from "./components/Hero";
import Products from "./components/Products";
import AboutMe from "./components/AboutMe";
import "./App.css";
import Content from "./components/Content";
import { BrowserRouter as Router, Link } from "react-router-dom";

class App extends React.Component {
  state = { products: [], isLoading: true };

  callAPI = () => {
    fetch("http://localhost:9000/testAPI", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({ products: res, isLoading: false }, () => {
          console.log(this.state.products);
        })
      );
  };

  componentWillMount = () => {
    this.callAPI();
  };
  render() {
    return (
      <div className="root-container">
        <Hero products={this.state.products} isLoading={this.state.isLoading} />
        <Content>
          <Products products={this.state.products} />
        </Content>
      </div>
    );
  }
}

export default App;
