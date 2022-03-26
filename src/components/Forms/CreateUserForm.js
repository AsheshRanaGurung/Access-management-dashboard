import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner } from "@chakra-ui/react";
import { adduser } from "../../redux/Actions/UserActon";

function CreateUserForm({ setOpenModal }) {
  const initialValues = { name: "", email: "", password: "" };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  const dispatch = useDispatch();
  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  const submitUserdetail = (values) => {
    const name = values.name;
    const email = values.email;
    const pass = values.password;
    dispatch(adduser(name, email, pass, userInfo));
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          submitUserdetail(values);

          setTimeout(() => {
            setSubmitting(false);
            resetForm();
            setOpenModal(false);
          }, 1000);
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
                  placeholder="Enter your Full name"
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
                Email:<br></br>
                <input
                  className="form-control"
                  name="email"
                  placeholder="Enter your email address"
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                ></input>
                <br />
                {errors.email && touched.email ? (
                  <span style={{ color: "red" }}>{errors.email}</span>
                ) : null}
              </div>
              <div className="form-input">
                Password:<br></br>
                <input
                  className="form-control"
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                />
                <br />
                {errors.password && touched.password ? (
                  <span style={{ color: "red" }}>{errors.password}</span>
                ) : null}
                <br />
              </div>
              <button
                className="modal-button"
                type="submit"
                disabled={isSubmitting === true}
              >
                <div className="primary-btn text">
                  {isSubmitting ? <Spinner /> : "Add"}
                </div>
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default CreateUserForm;
