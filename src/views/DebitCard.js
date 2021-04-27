import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debitAction } from "./actions";
import { clearLocalStorage } from "../utils";
import Modal from "../components/Modal";
import { validateInput } from "../utils";
import "./DebitCard.scss";

const DebitCard = () => {
  const [values, setValues] = useState({
    fullName: "",
    cvv: "",
    cardNumber: "",
    mm: "",
    yy: "",
  });
  const [mode, setMode] = useState(false);
  const dispatch = useDispatch();
  const Debit = useSelector((state) => state.DebitCardReducer.debit);

  useEffect(() => {
    if (Debit.fullName) {
      setValues((prevState) => ({
        ...prevState,
        ...Debit,
      }));
    }
  }, [Debit]);

  const handleChange = ({ target: { name, value } }) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMode(true);
    await dispatch(debitAction(values));
  };
  const handleConfirm = () => {
    setValues({
      fullName: "",
      cvv: "",
      cardNumber: "",
      mm: "",
      yy: "",
      cardType: "",
    });
    clearLocalStorage();
    setMode(false);
  };
  const handleValidation = (e) => {
    if (validateInput(e) === true) {
      // e.target.nextElementSibling.style.display = "block";
      // e.target.style.border = "2px solid red";
    }
    if (validateInput(e) === false) {
      // e.target.style.border = "2px solid green";
      // e.target.nextElementSibling.style.display = "none";
    }
    console.log("==============>", validateInput(e));
  };
  return (
    <Fragment>
      {!mode ? (
        <div className="debit_card">
          <h3>Debit Card</h3>
          <span>Kindly provide your debit card details</span>
          <form onSubmit={handleSubmit}>
            <div className="formrap">
              <div className="formwrap_fullname_cvv">
                <div className="formwrap_fullname">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    type="text"
                    name="fullName"
                    onBlur={handleValidation}
                    value={values.fullName}
                    onChange={handleChange}
                    placeholder="Enter fullname"
                  />
                  <span>Full name shouldbe atleast 3 characters long</span>
                </div>
                <div className="formwrap_cvv">
                  <label htmlFor="fullName">Cvv</label>
                  <input
                    type="number"
                    placeholder="CVV"
                    required
                    onBlur={handleValidation}
                    name="cvv"
                    value={values.cvv}
                    onChange={handleChange}
                  />
                  <span>Cvv should be atleast 3 numbers</span>
                </div>{" "}
              </div>{" "}
              <div className="formwrap_cardnumber">
                <label htmlFor="cardNumber">Card number</label>
                <input
                  type="number"
                  name="cardNumber"
                  value={values.cardNumber}
                  onChange={handleChange}
                  placeholder="Card Number"
                  required
                  onBlur={handleValidation}
                />
                <span> Card number should be 16 numbers</span>
              </div>{" "}
              <label htmlFor="expiring">Expiring date</label>
              <div className="formwrap_expiredate">
                <div className="expiredate_wrap">
                  {" "}
                  <div>
                    <input
                      type="number"
                      name="mm"
                      value={values.mm}
                      onChange={handleChange}
                      placeholder="MM"
                      required
                      onBlur={handleValidation}
                      min="01"
                      max="12"
                    />
                    <span> Months should be between 1 and 12 </span>
                  </div>
                  <input
                    type="number"
                    name="yy"
                    id="yy"
                    value={values.yy}
                    onChange={handleChange}
                    placeHolder="YY"
                    required
                    onBlur={handleValidation}
                    min="21"
                    max="25"
                  />
                  <span>Year should be between 21 through 25</span>
                </div>
                <div className="card_brand">
                  <div
                    className="card_brand_logo"
                    onClick={handleChange}
                    name="master card"
                    value="master card"
                  >
                    <img
                      src="https://res.cloudinary.com/dmyu8akhu/image/upload/v1595226247/mastercard_hle3je.svg"
                      alt=""
                    />
                  </div>
                  <div
                    className="card_brand_logo"
                    onClick={handleChange}
                    name="master card"
                    value="master card"
                  >
                    <img
                      src="https://res.cloudinary.com/dmyu8akhu/image/upload/v1595226249/visa_zdtzqh.png"
                      alt=""
                    />
                  </div>
                  <div
                    className="card_brand_logo"
                    onClick={handleChange}
                    name="master card"
                    value="master card"
                  >
                    <img
                      src="https://res.cloudinary.com/dmyu8akhu/image/upload/v1595226247/mastercard_hle3je.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>{" "}
              <div></div>
              <div>
                <button>Submit</button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Modal handleConfirm={handleConfirm} mode={mode} setMode={setMode} />
      )}
    </Fragment>
  );
};

export default DebitCard;
