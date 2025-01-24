import { Formik } from 'formik';
import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
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
import ForgotPassword from "../component/ForgotPassword";
import { useFormik } from "formik";
import { redirect } from "react-router";
import { set } from 'date-fns';
import { useNavigate } from 'react-router-dom'


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

const SignInContainer = styled(Stack)(({ theme }) => ({
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

    return errors;
};

export default function Profil() {
    const TOKEN = sessionStorage.getItem("token");
    const navigate = useNavigate()
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [newPasswordError, setNewPasswordError] = React.useState(false);
    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = React.useState("");
    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/",
    });

    useEffect(() => {
            if (sessionStorage.getItem("token") == null) {
              navigate("/");
            }
          }, []);


    const formik = useFormik({
        initialValues: {
            password: "",
            new_password: "",
        },
        validate,
        onSubmit: async (values) => {
            console.log("Valeurs : ", values)
            setTimeout(async () => {
                await submitChangePassword(values);
            }, 400);
        },
    });

    const [error, setError] = useState(null);

    const submitChangePassword = async (body) => {
        console.log(body);
        await client.patch('profil/change_password', body, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
            .then((response) => {
                sessionStorage.removeItem("token");
                navigate(0);
            })
            .catch((e) => console.log("dddd :", e));
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
                    >
                        Change password
                    </Typography>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}
                        method="post"
                        action='/home'
                        onSubmit={formik.handleSubmit}
                    >
                        <FormControl>
                            <FormLabel htmlFor="password">Actual password</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="password"
                                autoComplete="password"
                                autoFocus
                                required
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                variant="outlined"
                                color={passwordError ? "error" : "primary"}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="new_password">New password</FormLabel>
                            <TextField
                                error={newPasswordError}
                                helperText={newPasswordErrorMessage}
                                name="new_password"
                                placeholder="••••••"
                                type="password"
                                id="new_password"
                                autoComplete="new_password"
                                autoFocus
                                required
                                fullWidth
                                value={formik.values.newpassword}
                                onChange={formik.handleChange}
                                variant="outlined"
                                color={newPasswordError ? "error" : "primary"}
                            />
                        </FormControl>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        {formik.errors.newpassword ? <div>{formik.errors.newpassword}</div> : null}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Change password
                        </Button>
                        <div className="h-5"></div>
                    </form>
                </Card>
            </SignInContainer>
        </>
    )
}
