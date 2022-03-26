import React from "react";
import "./Modal.css";
import CreateUserForm from "../Forms/CreateUserForm";
import AddRoleForm from "../Forms/AddRoleform";

function AddRoleModal({ setOpenModal }) {
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
          <h1>Add Role</h1>
        </div>
        <div className="divider"></div>
        <div className="body">
          <AddRoleForm setOpenModal={setOpenModal} />
        </div>
      </div>
    </div>
  );
}

export default AddRoleModal;
