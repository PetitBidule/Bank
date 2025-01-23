import React, { useEffect, useState } from "react";
import axios from "axios";
import BankAccount from "../component/BankAccount";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AppNavbar from "../component/sideBard"

const ViewBankAccounts = () => {
  const TOKEN = sessionStorage.getItem("token");
  const [accounts, setAccounts] = useState([]);
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

  const formik = useFormik({
    initialValues: {
      name: "foobar@example.com",
      balance: "foobar",
      type: handleChange,
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      await submitOpenAccount(values);
    },
  });


  const submitOpenAccount = async (body) => {
    await client
      .post(
        "open_account",
        {
          user_id: 1,
          type_id: type == "Autre" ? 3 : type == "Courant" ? 1 : 2,
          name: body.name,
          balance: body.balance,
          is_closed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((e) => console.log(e));
  };


  useEffect(() => {
    axios
      .get("http://localhost:8000/view_accounts", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
      });
  }, []);

  return (
    <div>
     <AppNavbar />
      <div className="container mx-auto p-4 mt-20">
        {accounts.length === 0 ? (
          <p className="text-center text-gray-500">Pas de comptes</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {accounts.map((account) => (
              <BankAccount
                key={account.id}
                account={account}
                // deleteAccount={deleteAccount}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="balance"
            name="balance"
            label="balance"
            type="number"
            value={formik.values.balance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.balance && Boolean(formik.errors.balance)}
            helperText={formik.touched.balance && formik.errors.balance}
          />
          <InputLabel id="Type Account">Type Account</InputLabel>
          <Select
            labelId="type"
            id="type"
            value={type}
            onChange={handleChange}
            // input={<BootstrapInput />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Courant">Courant</MenuItem>
            <MenuItem value="Epargne">Epargne</MenuItem>
          </Select>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
        {error ? <div>{error}</div> : null}
      </div>
    </div>
  );
};

export default ViewBankAccounts;
