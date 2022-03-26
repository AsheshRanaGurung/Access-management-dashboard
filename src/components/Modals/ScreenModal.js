import React from "react";
import "./Modal.css";
import AddScreenForm from "../Forms/AddScreenForm";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Add Screen</h1>
        </div>
        <div className="divider"></div>
        <div className="body">
          <AddScreenForm modal={setOpenModal} />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Modal;
