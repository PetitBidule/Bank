import React, { useEffect, useState } from "react";
import axios from "axios";
import BankAccount from "../component/BankAccount";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

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
    // validationSchema: validationSchema,
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

  const deleteAccount = async () => {
    await client
      .post(
        "close_account",
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          params: {
            account_id: 16,
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((e) => {console.log(e.response.data.detail), setError(e.response.data.detail)
      });
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
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Bank Account
          </Typography>
        </Toolbar>
      </AppBar>

      {/* <Drawer
        variant="permanent"
        sx={{
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
        }}
      >
        {" "}
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer> */}

      <div className="container mx-auto p-4 mt-20">
        {accounts.length === 0 ? (
          <p className="text-center text-gray-500">Pas de comptes</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {accounts.map((account) => (
              // console.log(account),
              <BankAccount
                key={account.id}
                account={account}
                deleteAccount={deleteAccount}
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
