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
import ForgotPassword from "../../component/ForgotPassword";
import { useFormik } from "formik";

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

export default function Register() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
    },
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
      .then((response) => {
        console.log(response.data),
          sessionStorage.setItem("token", response.data.token);
      })
      .catch((e) => console.log(e));
  };

  // const validateInputs = () => {
  //   const email = document.getElementById("email");
  //   const password = document.getElementById("password");
  //   console.log(email.value);
  //   console.log(password.value);

  //   let isValid = true;

  //   if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //     setEmailError(true);
  //     setEmailErrorMessage("Please enter a valid email address.");
  //     isValid = false;
  //   } else {
  //     setEmailError(false);
  //     setEmailErrorMessage("");
  //   }

  //   if (!password.value || password.value.length < 6) {
  //     setPasswordError(true);
  //     setPasswordErrorMessage("Password must be at least 6 characters long.");
  //     isValid = false;
  //   } else { 
  //     setPasswordError(false);
  //     setPasswordErrorMessage("");
  //   }

  //   return isValid;
  // };

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
                href="/home"
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
