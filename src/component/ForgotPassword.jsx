import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ForgotPassword({ id, open, handleClose }) {
  const TOKEN = sessionStorage.getItem("token");
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const deleteAccount = async (id) => {
    console.log(id);
    await client
      .post(
        "close_account",
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          params: {
            account_id: id,
            password: user,
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((e) => console.log(e)
      );
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your password for delete Account
        </DialogContentText>
      <input type="password" style={{background: "white"}} id="password" name="password" required minlength="4" onInput={(e) => setUser(e.target.value)} />

      </DialogContent>
      { error != null ? error : "null" }
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          type="submit"
          onClick={(e) => {
            deleteAccount(id);
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default ForgotPassword;
