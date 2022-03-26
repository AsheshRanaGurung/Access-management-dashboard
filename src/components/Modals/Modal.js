import React from "react";
import "./Modal.css";
import CreateUserForm from "../Forms/CreateUserForm";

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
          <h1>Add Users</h1>
        </div>
        <div className="divider"></div>
        <div className="body">
          <CreateUserForm setOpenModal={setOpenModal} />
        </div>
        {/* <div className="footer">
         

          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Modal;
