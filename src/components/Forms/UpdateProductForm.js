import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addscreen, editscreen } from "../../redux/Actions/ScreenAction";
import { editproduct } from "../../redux/Actions/ProductAction";

function UpdateProductForm(props) {
  const { modal, id, name, desc, img, qty } = props;

  const initialValues = {
    name: name,
    descriptions: desc,
    image: img,
    quantity: qty,
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
    const qty = parseInt(values.quantity);
    const image = values.image;

    dispatch(editproduct(id, name, desc, qty, image, userInfo));
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // console.log(JSON.stringify(values));
          submitscreendata(values);
          modal(false);
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
                  placeholder={name}
                  value={values.name}
                  // onChange={(e) => {
                  //   handleChange(e);
                  // }}
                  disabled
                  onBlur={handleBlur}
                />
                <br />
                {/* {errors.name && touched.name ? (
                  <span style={{ color: "red" }}>{errors.name}</span>
                ) : null} */}
              </div>
              <div className="form-input">
                descriptions:<br></br>
                <input
                  className="form-control"
                  name="descriptions"
                  placeholder={desc}
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
                className="add-users"
                type="submit"
                disabled={isSubmitting === true}
              >
                <div className="primary-btn text">
                  {isSubmitting ? <Spinner /> : "Update Product"}
                </div>
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default UpdateProductForm;
