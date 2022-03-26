import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addscreen, editscreen } from "../../redux/Actions/ScreenAction";
import { edituser } from "../../redux/Actions/UserActon";

function EditUserForm(props) {
  const { modal, id, name, email } = props;

  const initialValues = { name: name, email: email, password: "" };

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

    dispatch(edituser(id, name, email, pass, userInfo));
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
          setSubmitting(false);
          modal(false);

          resetForm();
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
                  placeholder={email}
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
                  {isSubmitting ? <Spinner /> : "Update"}
                </div>
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default EditUserForm;
