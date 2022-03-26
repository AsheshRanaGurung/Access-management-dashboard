import React from "react";
import "./Modal.css";
import UpdateScreenForm from "../Forms/UpdateScreenForm";

function UpdateScreenModal({ setOpenModal, id, name, desc }) {
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
          <h1>Update Screen</h1>
        </div>
        <div className="divider"></div>
        <div className="body">
          <UpdateScreenForm
            modal={setOpenModal}
            id={id}
            name={name}
            desc={desc}
          />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default UpdateScreenModal;
