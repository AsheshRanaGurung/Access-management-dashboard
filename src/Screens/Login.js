import React from "react";
import { useSelector } from "react-redux";

import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userLogin } from "../redux/Actions/UserActon";
import { useDispatch } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const paperStyle = {
    padding: "20px",
    height: "60vh",
    width: 300,
    margin: "8rem auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnStyle = { margin: "8px 0" };

  const logininfo = useSelector((state) => state.userlogin);
  const { loading } = logininfo;
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required("No password provided"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitUserdetail = (values) => {
    const email = values.email;
    const pass = values.password;
    dispatch(userLogin(email, pass));
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const response = await axios.post(
              "https://ecom-react-task.herokuapp.com/auth/login",
              { email: values.email, password: values.password }
            );

            if (response?.data?.success && response?.data?.data?.token) {
              localStorage.setItem(
                "usertoken",
                JSON.stringify(response.data.data.token)
              );
              navigate("/");
            }

            console.log(response.data.success);
            // submitUserdetail(values);
            setSubmitting(false);
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
            <Form>
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
              </div>

              <FormControlLabel
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting === true}
                style={btnStyle}
                fullWidth
              >
                {loading ? <Spinner /> : "Login"}
              </Button>
            </Form>
          )}
        </Formik>

        <Typography>
          <Link href="#">Forget password</Link>
        </Typography>
        <Typography>
          Do you have an account?
          {/* <Link href="#" onClick={() => handleChange("event", 1)}> */}
          Sign up?
          {/* </Link> */}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;

// import React from "react";
// import { useSelector } from "react-redux";

// import {
//   Avatar,
//   Button,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Link,
// } from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { userLogin } from "../redux/Actions/UserActon";
// import { useDispatch } from "react-redux";
// import { Spinner } from "@chakra-ui/react";

// const Login = () => {
//   const paperStyle = {
//     padding: "20px",
//     height: "60vh",
//     width: 300,
//     margin: "8rem auto",
//   };
//   const avatarStyle = { backgroundColor: "#1bbd7e" };
//   const btnStyle = { margin: "8px 0" };

//   const logininfo = useSelector((state) => state.userlogin);
//   const { loading } = logininfo;
//   const initialValues = {
//     email: "",
//     password: "",
//     remember: false,
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email().required(),
//     password: Yup.string().required("No password provided"),
//   });

//   const dispatch = useDispatch();

//   const submitUserdetail = (values) => {
//     const email = values.email;
//     const pass = values.password;
//     dispatch(userLogin(email, pass));
//   };

//   return (
//     <Grid>
//       <Paper style={paperStyle}>
//         <Grid align="center">
//           <Avatar style={avatarStyle}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <h2>Sign in</h2>
//         </Grid>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           enableReinitialize={true}
//           onSubmit={(values, { setSubmitting, resetForm }) => {
//             submitUserdetail(values);
//             setSubmitting(false);
//             resetForm();
//           }}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             isSubmitting,
//           }) => (
//             <Form>
//               <div className="form-input">
//                 Email:<br></br>
//                 <input
//                   className="form-control"
//                   name="email"
//                   placeholder="Enter your email address"
//                   value={values.email}
//                   onChange={(e) => {
//                     handleChange(e);
//                   }}
//                   onBlur={handleBlur}
//                 ></input>
//                 <br />
//                 {errors.email && touched.email ? (
//                   <span style={{ color: "red" }}>{errors.email}</span>
//                 ) : null}
//               </div>
//               <div className="form-input">
//                 Password:<br></br>
//                 <input
//                   className="form-control"
//                   type="text"
//                   name="password"
//                   placeholder="Enter your password"
//                   value={values.password}
//                   onChange={(e) => {
//                     handleChange(e);
//                   }}
//                   onBlur={handleBlur}
//                 />
//                 <br />
//                 {errors.password && touched.password ? (
//                   <span style={{ color: "red" }}>{errors.password}</span>
//                 ) : null}
//               </div>

//               <FormControlLabel
//                 name="remember"
//                 control={<Checkbox color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 disabled={isSubmitting === true}
//                 style={btnStyle}
//                 fullWidth
//               >
//                 {loading ? <Spinner /> : "Login"}
//               </Button>
//             </Form>
//           )}
//         </Formik>

//         <Typography>
//           <Link href="#">Forget password</Link>
//         </Typography>
//         <Typography>
//           Do you have an account?
//           {/* <Link href="#" onClick={() => handleChange("event", 1)}> */}
//           Sign up?
//           {/* </Link> */}
//         </Typography>
//       </Paper>
//     </Grid>
//   );
// };

// export default Login;
