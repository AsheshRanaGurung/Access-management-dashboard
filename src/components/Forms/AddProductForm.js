import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/Actions/ProductAction";

function AddProductForm(props) {
  const { setOpenModal } = props;

  const initialValues = {
    name: "",
    descriptions: "",
    image: "https://betanews.com/wp-content/uploads/2014/11/front.jpg",
    quantity: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    descriptions: Yup.string().required(),
    image: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .required("Please enter website"),
    quantity: Yup.number()
      .typeError("you must specify a number")
      .min(0, "Min value 0.")
      .max(30, "Max value 30."),
  });
  const dispatch = useDispatch();

  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  const submitscreendata = (values) => {
    const name = values.name;
    const desc = values.descriptions;
    const qty = values.quantity;
    const image = values.image;

    dispatch(addProduct(name, desc, qty, image, userInfo));
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(JSON.stringify(values));
          submitscreendata(values);
          setOpenModal(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <div className="content" style={{ width: "24rem" }}>
            <Form>
              <div className="form-input">
                Name:<br></br>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Product name"
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                />
                <br />
                {errors.name && touched.name ? (
                  <span style={{ color: "red" }}>{errors.name}</span>
                ) : null}
              </div>
              <div className="form-input">
                descriptions:<br></br>
                <input
                  className="form-control"
                  name="descriptions"
                  placeholder="Enter details "
                  value={values.descriptions}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                ></input>
                <br />
                {errors.descriptions && touched.descriptions ? (
                  <span style={{ color: "red" }}>{errors.descriptions}</span>
                ) : null}
              </div>
              <div className="form-input">
                Quantity:<br></br>
                <input
                  className="form-control"
                  name="quantity"
                  placeholder="Enter qty "
                  value={values.quantity}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                ></input>
                <br />
                {errors.quantity && touched.quantity ? (
                  <span style={{ color: "red" }}>{errors.quantity}</span>
                ) : null}
              </div>
              <div className="form-input">
                Image:<br></br>
                <input
                  className="form-control"
                  name="image"
                  placeholder={initialValues.image}
                  value={values.image}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                ></input>
                <br />
              </div>
              <button
                className="modal-button"
                type="submit"
                disabled={isSubmitting === true}
              >
                <div className="primary-btn text">
                  {isSubmitting ? <Spinner /> : "Add Product"}
                </div>
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default AddProductForm;
