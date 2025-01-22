import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";

function ForgotPassword({ open, handleClose, deleteAccount }) {
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
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="Password"
          name="Password"
          label="Password"
          placeholder="Password"
          type="Password"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" onClick={(e) => {
          console.log(e);
          // if (e.target.value === )
          deleteAccount()
          } }>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
