import React, { useState } from "react";
import "./Information.scss";

const Information = (props) => {
  const {
    onInputChange,
    countries,
    User,
    onShippingSubmit,
    errors,
    touched,
    handleBlur,
    buttonLoading,
  } = props;

  const stateList = () => {
    if (User.countryCode) {
      let country = countries.find((id) => {
        return id.code === User.countryCode && id.states;
      });

      return country ? (
        <div>
          <label>State</label>

          <select
            className="state-input location"
            name="stateCode"
            onChange={(e) => {
              onInputChange(e);
            }}
          >
            {country.states.map((state, i) => {
              if (User.stateCode === state.code) {
                return (
                  <option value={state.code} key={i} selected>
                    {state.name}
                  </option>
                );
              }
              return (
                <option value={state.code} key={i}>
                  {state.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div />
      );
    }
  };

  return (
    <div className="form">
      <form className="form-container" onSubmit={onShippingSubmit}>
        <div className="form-contacts ">
          <h3>Contacts</h3>
          <div>
            <label>Email (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                onInputChange(e);
              }}
              className="form-input"
              value={User.email}
            ></input>
          </div>
          <div>
            <label>Phone Number (optional)</label>

            <input
              className="form-input"
              name="phone"
              onChange={(e) => {
                onInputChange(e);
              }}
              value={User.phone}
            ></input>
          </div>
        </div>
        <div className="form-shipping">
          <h3>Shipping</h3>
          <div>
            <label>Full Name</label>
            <input
              className="form-input"
              onChange={onInputChange}
              required
              value={User.fullName}
              name="fullName"
              onBlur={handleBlur}
              type="text"
            ></input>
            <div className="form-error">
              {touched.fullName && errors.fullName}
            </div>
          </div>
          <div>
            <label>Address</label>
            <input
              className="form-input"
              name="address"
              onChange={(e) => {
                onInputChange(e);
              }}
              onBlur={handleBlur}
              value={User.address}
              type="text"
              required
            ></input>
            <div className="form-error">
              {touched.address && errors.address}
            </div>
          </div>
          <div>
            <label>Address 2 (optional)</label>
            <input
              className="form-input"
              name="address2"
              onChange={(e) => {
                onInputChange(e);
              }}
              value={User.address2}
            ></input>
          </div>
          <div>
            <label>City</label>
            <input
              className="form-input"
              type="text"
              name="city"
              onChange={(e) => {
                onInputChange(e);
              }}
              value={User.city}
              onBlur={handleBlur}
              required
            ></input>
            <div className="form-error">{touched.city && errors.city}</div>
          </div>
          <div className="location-form">
            <div className="country-container">
              <label>Country</label>
              <select
                className="country-input location"
                name="countryCode"
                onChange={(e) => {
                  onInputChange(e);
                }}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="ES">Spain</option>
                <option value="BR">Brazil</option>
                <option disabled="disabled" value="---">
                  ---
                </option>
                {countries.map((country, i) => {
                  if (country.code === User.countryCode) {
                    return (
                      <option value={country.code} key={i} selected>
                        {country.name}
                      </option>
                    );
                  }
                  return (
                    <option value={country.code} key={i}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
              {touched.country && errors.country}
            </div>
            <div>{stateList()}</div>

            <div>
              <label>Zip</label>
              <input
                className="zip-input location"
                name="zip"
                onChange={onInputChange}
                value={User.zip}
                onBlur={handleBlur}
                required
              ></input>
              <div className="form-error">{touched.zip && errors.zip}</div>
            </div>
          </div>
        </div>

        <div className="checkout-button-container">
          <button className="checkout-button" type="submit">
            {buttonLoading ? (
              <div>
                Loading <i class="fa fa-circle-o-notch fa-spin"></i>
              </div>
            ) : (
              "Continue To Payment"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Information;
