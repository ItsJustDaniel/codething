import React, { useState, useEffect } from "react";
import withContext from "../withContext";
import "./Contact.scss";
import axios from "axios";

const Contact = (props) => {
  const [message, setMessage] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState(null);

  useEffect(() => {
    props.context.shouldNavPush();
  }, [props.context.navbarPush, props.context]);

  const onContactSubmit = async (e) => {
    e.preventDefault();
    props.context.loadingChange();
    const sendMail = await axios.post(
      "https://code-clothing.herokuapp.com/mail",
      {
        ...message,
      }
    );

    console.log(sendMail);

    await props.context.loadingChange();
    if (sendMail.data === "success") {
      setMessageSuccess(true);
    } else {
      setMessageSuccess(false);
    }
  };

  const onContactChange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
    console.log(message);
  };

  return (
    <div>
      <h1 className="contact-title">Contact Me</h1>
      <form className="contact-form" onSubmit={onContactSubmit}>
        <div className="contact-name">
          <label className="contact-label">Name:</label>
          <input
            className="contact-input"
            name="name"
            onChange={(e) => {
              onContactChange(e);
            }}
          ></input>
        </div>
        <div className="contact-email">
          <label className="contact-label">Email:</label>
          <input
            className="contact-input"
            name="email"
            onChange={(e) => {
              onContactChange(e);
            }}
          ></input>
        </div>
        <div className="contact-message">
          <label className="contact-label">Message:</label>
          <textarea
            className="contact-textArea"
            name="message"
            onChange={(e) => {
              onContactChange(e);
            }}
          ></textarea>
        </div>
        {messageSuccess ? (
          <p className="message-status">Message sent successfully </p>
        ) : messageSuccess === false ? (
          <p className="message-status">Message failed</p>
        ) : (
          <div></div>
        )}
        <div className="contact-submit-container">
          <button className="contact-submit" id="submit">
            Submit
          </button>
        </div>
      </form>
      <h2 className="social-title">You can also find me on</h2>
      <div className="social-icon-container">
        <a
          href="mailto:danielli12750@gmail.com"
          className="social-icon"
          target="_blank"
        >
          <i class="fas fa-envelope-square"></i>
        </a>
        <a
          className="social-icon"
          href="https://twitter.com/Justdaniel5"
          target="_blank"
        >
          <i class="fab fa-twitter-square"></i>
        </a>
        <a
          className="social-icon"
          href="https://discord.bio/p/leinad"
          target="_blank"
        >
          <i class="fab fa-discord"></i>
        </a>
        <a
          className="social-icon"
          href="https://www.linkedin.com/in/daniel-li-7709621a3/"
          target="_blank"
        >
          <i class="fab fa-linkedin"></i>
        </a>
        <a
          className="social-icon"
          href="https://github.com/ItsJustDaniel"
          target="_blank"
        >
          <i class="fab fa-github-square"></i>
        </a>
      </div>
    </div>
  );
};

export default withContext(Contact);
