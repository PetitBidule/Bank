import axios from "axios";
import { Formik } from "formik";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "500px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));
const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "90%",
  minHeight: "90%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const validate = values => {
  
  const errors = {};
  if (values.firstName == "") {
    errors.firstName = 'Required';
  } 

  if (values.lastName == "") {
    errors.lastName = 'Required';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(values.password)) {
    console.log("invalid password");
    
    errors.password = 'Invalid password';
  }
  return errors;
};

export default function Register() {
  const navigate = useNavigate()
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      navigate("/dashboard");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log("Valeurs : ",values)
      setTimeout(async () => {
        await submitRegister(values);
      }, 400);
    },
  });

  const submitRegister = async (body) => {
    console.log(body);
    await client
      .post("register", body)
      .then((response) => 
          sessionStorage.setItem("token", response.data.token),
      ).then((_) => navigate("/dashboard"))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <form
          action= "/home"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
            method="post"
            onSubmit={formik.handleSubmit}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                onChange={formik.handleChange}
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>

            {formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <FormControl>
              <FormLabel htmlFor="firstname">firstname</FormLabel>
              <TextField
                name="firstname"
                placeholder="firstname"
                type="firstname"
                id="firstname"
                autoFocus
                required
                fullWidth
                onChange={formik.handleChange}
                variant="outlined"
              />
            </FormControl>

            {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
            
            <FormControl>
              <FormLabel htmlFor="lastname">lastname</FormLabel>
              <TextField
                name="lastname"
                placeholder="lastname"
                type="lastname"
                id="lastname"
                autoFocus
                required
                fullWidth
                onChange={formik.handleChange}
                variant="outlined"
              />
            </FormControl>

            {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                onChange={formik.handleChange}
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>

              {formik.errors.password ? <div>{formik.errors.password}</div> : null}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div className="h-5"></div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign up
            </Button>
            <div className="h-5"></div>

          </form>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
              <Link
                href="/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
