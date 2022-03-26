import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Spinner } from "@chakra-ui/react";
import { addRole } from "../../redux/Actions/RoleAction";

function AddRoleForm({ setOpenModal }) {
  const initialValues = { name: "", descriptions: "" };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    descriptions: Yup.string().required(),
  });

  const dispatch = useDispatch();
  const userInfo = localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null;

  const submitRoledetail = (values) => {
    const name = values.name;
    const desc = values.descriptions;

    dispatch(addRole(name, desc, userInfo));
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submitRoledetail(values);

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
                Role Name:<br></br>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Role name"
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
                Description:<br></br>
                <input
                  className="form-control"
                  name="descriptions"
                  placeholder="Enter details"
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

              <button
                className="add-users"
                type="submit"
                disabled={isSubmitting === true}
              >
                <div className="primary-btn text">
                  {isSubmitting ? <Spinner /> : "Add Role"}
                </div>
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default AddRoleForm;
