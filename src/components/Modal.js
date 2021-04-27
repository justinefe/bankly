import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Modal.scss";

const Modal = ({ handleConfirm, setMode }) => {
  const dispatch = useDispatch();
  const Debit = useSelector((state) => state.DebitCardReducer.debit);
  const { fullName, cvv, mm, yy, cardNumber } = Debit;
  const myModalRef = useRef();

  const handleClose = (e) => {
    myModalRef.current.style.display = "none";
    setMode(false);
  };

  useEffect(() => {
    window.addEventListener("onclick", (event) => {
      if (event.target == myModalRef.current) {
        myModalRef.current.style.display = "none";
        setMode(false);
      }
    });
    return () => {
      window.removeEventListener("onclick", (event) => {
        if (event.target == myModalRef.current) {
          myModalRef.current.style.display = "none";
          setMode(false);
        }
      });
    };
  }, []);

  return (
    <div ref={myModalRef} class="modal">
      <div class="modal-content">
        <span onClick={handleClose} class="close">
          &times;
        </span>
        <div className="debit_details">
          <h3>
            Full name:
            <strong>{fullName}</strong>
          </h3>
          <h3>
            Cvv:
            <strong>{cvv}</strong>
          </h3>
          <h3>
            Card number:
            <strong>{cardNumber}</strong>
          </h3>
          <h3>
            Expiring month:
            <strong>{mm}</strong>
          </h3>
          <h3>
            Expiring year:
            <strong>{yy}</strong>
          </h3>
        </div>

        <div className="debit_details_btn">
          <button onClick={handleConfirm}>Confirm</button>{" "}
          <button onClick={handleClose}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
