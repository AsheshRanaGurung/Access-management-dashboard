import React from "react";
import "./Modal.css";
import UpdateRoleForm from "../Forms/UpdateRoleForm";

function UpdateRoleModal({ setOpenModal, id, name, desc }) {
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
          <h1>Update Role</h1>
        </div>
        <div className="divider"></div>
        <div className="body">
          <UpdateRoleForm
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

export default UpdateRoleModal;
