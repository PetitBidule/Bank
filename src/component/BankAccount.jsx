import * as React from "react";
import { Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

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
        <div className="flex justify-between">
          <Link to={`/account/${account.id}/transactions`} className="block">
            Open
          </Link>
          <ForgotPassword
            key={account.id}
            id={account.id}
            open={open}
            handleClose={handleClose}
          />
          {/* <button onClick={handleClickOpen}>Delete</button> */}
          <IconButton aria-label="delete" color="error" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}
