import {
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormHelperText } from "@material-ui/core";
import * as Yup from "yup";

const Signup = () => {
  const paperStyle = { padding: "20px", width: 300, margin: "0 auto" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const headerStyle = { margin: 0 };
  const btnStyle = { margin: "8px auto" };
  const formStyle = { marginTop: 5 };

  const initialValues = {
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: "false",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, " Name is too short").required("Required"),
    email: Yup.string().email("Enter your valid email").required("Required"),
    gender: Yup.string().oneOf(["male", "female"]).required("Required"),
    phoneNumber: Yup.number()
      .typeError("Should be Number Only")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password don't match")
      .required("Required"),
    termsAndConditions: Yup.string().oneOf(
      ["true"],
      "Accept terms and Conditions"
    ),
  });
  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 1000);

    console.log(props);
  };
  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Name"
                name="name"
                placeholder="Enter your name"
                fullWidth
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                label="Email"
                name="email"
                placeholder="Enter your email"
                fullWidth
                helperText={<ErrorMessage name="email" />}
              />
              <FormControl style={formStyle}>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <Field
                  as={RadioGroup}
                  style={{ display: "initial" }}
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="gender"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </Field>
              </FormControl>
              <FormHelperText>{<ErrorMessage name="gender" />}</FormHelperText>
              <Field
                as={TextField}
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                fullWidth
                helperText={<ErrorMessage name="phoneNumber" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                fullWidth
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                fullWidth
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    name="termsAndConditions"
                    color="primary"
                  />
                }
                label="I accept all the terms and condition"
              />
              <FormHelperText>
                {<ErrorMessage name="termsAndConditions" />}
              </FormHelperText>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={btnStyle}
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Loading" : "Sign UP"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
