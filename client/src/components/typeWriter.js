import React from "react";
import "./typeWriter.css";

class TypeWriter extends React.Component {
  state = { text: "", data: ["Hello World!", "Code-Clothing()"] };

  typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      this.setState({ text: this.state.text + text[i] });

      setTimeout(() => {
        this.typeWriter(text, i + 1, fnCallback);
      }, 100);
    } else if (typeof fnCallback == "function") {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }

  startTextAnimation(i) {
    if (i < this.state.data[i].length) {
      this.typeWriter(this.state.data[i], 0, () => {
        if (i + 1 === this.state.data.length) {
          return;
        }
        this.setState({ text: "" });
        this.startTextAnimation(i + 1);
      });
    }
  }
  componentDidMount() {
    console.log(this.state.text);

    this.startTextAnimation(0);
  }
  render() {
    return <h1 className="hero-title">{this.state.text}</h1>;
  }
}

export default TypeWriter;
