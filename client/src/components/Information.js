import React from "react";
import "./Information.scss";

const Information = (props) => {
  const { onInputChange, countries, User, onShippingClick } = props;

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
      <div className="form-container">
        <div className="form-contacts ">
          <h3>Contacts</h3>
          <label>Email (optional)</label>
          <input
            name="email"
            onChange={(e) => {
              onInputChange(e);
            }}
            className="form-input"
            value={User.email}
          ></input>
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
        <div className="form-shipping">
          <h3>Shipping</h3>
          <label>Full Name</label>
          <input
            className="form-input"
            name="name"
            onChange={(e) => {
              onInputChange(e);
            }}
            value={User.name}
          ></input>
          <label>Address</label>
          <input
            className="form-input"
            name="address"
            onChange={(e) => {
              onInputChange(e);
            }}
            value={User.address}
          ></input>
          <label>Address 2 (optional)</label>
          <input
            className="form-input"
            name="address2"
            onChange={(e) => {
              onInputChange(e);
            }}
            value={User.address2}
          ></input>
          <label>City</label>
          <input
            className="form-input"
            name="city"
            onChange={(e) => {
              onInputChange(e);
            }}
            value={User.city}
          ></input>
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
            </div>
            <div>{stateList()}</div>

            <div>
              <label>Zip</label>
              <input
                className="zip-input location"
                name="zip"
                onChange={(e) => {
                  onInputChange(e);
                }}
                value={User.zip}
              ></input>
            </div>
          </div>
        </div>

        <div className="checkout-button-container">
          <button className="checkout-button" onClick={() => onShippingClick()}>
            Continue To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Information;
