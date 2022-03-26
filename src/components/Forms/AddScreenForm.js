import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addscreen } from "../../redux/Actions/ScreenAction";
import { useNavigate } from "react-router-dom";

function AddScreenForm(props) {
  const { modal } = props;
  const initialValues = { name: "", descriptions: "" };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    descriptions: Yup.string().required(),
  });
  const dispatch = useDispatch();

  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  const submitscreendata = (values) => {
    const name = values.name;
    const desc = values.descriptions;

    dispatch(addscreen(name, desc, userInfo));
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
                  placeholder="Enter Screen name"
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

              <button
                className="add-users"
                type="submit"
                disabled={isSubmitting === true}
              >
                <div className="primary-btn text">
                  {isSubmitting ? <Spinner /> : "Add Screen"}
                </div>
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default AddScreenForm;
