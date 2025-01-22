import * as React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ForgotPassword from "./ForgotPassword";
export default function BankAccount({ account, deleteAccount }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:bg-gray-100 cursor-pointer">
        <h2 className="text-xl font-bold mb-2 account-title-color truncate">
          {account.name}
        </h2>
        <p className="text-gray-700 mb-1">{account.iban}</p>
        <p className="text-gray-700 mb-4">Balance: {account.balance}</p>
        <p className="text-gray-700 mb-4">{account.type}</p>
        <Link to={`/account/${account.id}/transactions`} className="block">
          Nav
        </Link>
        <ForgotPassword open={open} handleClose={handleClose} deleteAccount={deleteAccount} />

        <button  onClick={handleClickOpen} >
          Delete
        </button>
      </div>
    </>
  );
}
