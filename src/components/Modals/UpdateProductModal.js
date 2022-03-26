import React from "react";
import "./Modal.css";
import UpdateProductForm from "../Forms/UpdateProductForm";

function UpdateProductModal({ setOpenModal, id, name, desc, qty, img }) {
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
          <h1>Update Product</h1>
        </div>
        <div className="divider"></div>
        <div className="body">
          <UpdateProductForm
            modal={setOpenModal}
            id={id}
            name={name}
            desc={desc}
            qty={qty}
            img={img}
          />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default UpdateProductModal;
