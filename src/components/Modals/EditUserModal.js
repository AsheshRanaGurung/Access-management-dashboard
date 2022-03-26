import React from "react";
import "./Modal.css";
import EditUserForm from "../Forms/EditUserForm";

function EditUserModal({ setOpenModal, id, name, email }) {
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
          <h1>Edit user</h1>
        </div>
        <div className="divider"></div>
        <div className="body">
          <EditUserForm
            modal={setOpenModal}
            id={id}
            name={name}
            email={email}
          />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default EditUserModal;
