import React from "react";
import "./App.css";
import Purchase from "../Templates/Purchase";
import Home from "./Home";
import Cart from "./Cart";
import Context from "../Context";
import Checkout from "./Checkout";
import Contact from "./Contact";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Display from "../components/Display";
import Loader from "../components/Loader";

import "./App.scss";

class App extends React.Component {
  state = {
    products: [],
    isLoading: true,
    desc: [],
    cart: [],
    navbarPush: "navbar-unpush",
    countries: [],
    paymentID: "",
  };

  setPaymentID = (id) => {
    this.setState({ paymentID: id });
  };

  getProductDesc = () => {
    return axios.get("https://code-clothing.herokuapp.com/productDesc");
  };

  getProductList = () => {
    return axios.get("https://code-clothing.herokuapp.com/productList");
  };

  loadingChange = () => {
    this.setState(
      {
        isLoading: !this.state.isLoading,
      },
      () => console.log(this.state.isLoading)
    );
  };

  async componentDidMount() {
    const [products, desc, countries] = await Promise.all([
      this.getProductList(),
      this.getProductDesc(),
      axios.get("https://code-clothing.herokuapp.com/countries"),
    ]);
    this.setState(
      {
        products: products.data,
        isLoading: false,
        desc: desc.data,
        countries: countries.data.result,
      },
      () => {
        console.log(this.state.products);
      }
    );
  }

  onPageChange = () => {
    this.setState({ pageChange: true });
  };

  addToCart = (id, variantID, size, price, fileID) => {
    this.setState(
      {
        cart: [
          ...this.state.cart,
          {
            id: id,
            variantID: variantID,
            size: size,
            price: price,
            fileID: fileID,
          },
        ],
      },
      () => {
        console.log(this.state.cart);
      }
    );
  };

  removeFromCart = (i) => {
    this.setState({
      cart: this.state.cart.slice(0, i).concat(this.state.cart.slice(i + 1)),
    });
  };

  navbarPush = () => {
    switch (window.location.pathname) {
      case "/":
        console.log("home");
        if (this.state.navbarPush !== "navbar-push") {
          this.setState({ navbarPush: "navbar-push" });
        }
        return;
      default:
        console.log("anywhere");
        if (this.state.navbarPush !== "navbar-unpush") {
          this.setState({ navbarPush: "navbar-unpush" });
        }
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loader-container">
          <Loader />
        </div>
      );
    }
    return (
      <div className="root-container">
        <Context.Provider
          value={{
            ...this.state,
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            shouldNavPush: this.navbarPush,
            loadingChange: this.loadingChange,
            setPaymentID: this.setPaymentID,
          }}
        >
          <Router>
            <Display
              navbarPush={this.state.navbarPush}
              cartItems={this.state.cart.length}
            >
              <Switch>
                <Route path="/products/:id" component={Purchase}></Route>
                <Route path="/cart" component={Cart}></Route>
                <Route path="/checkout" component={Checkout}></Route>
                <Route path="/contact" component={Contact}></Route>
                <Route exact path="/" component={Home}></Route>
                <Route path="*">
                  <h1>Error 404, Page not found</h1>
                </Route>
              </Switch>
            </Display>
          </Router>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
