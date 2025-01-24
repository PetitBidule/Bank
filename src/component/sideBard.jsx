import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiToolbar from "@mui/material/Toolbar";
import { tabsClasses } from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Link } from "react-router";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom'
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/logo.png";
import Person2Icon from '@mui/icons-material/Person2';
import PaidIcon from '@mui/icons-material/Paid';

const Toolbar = styled(MuiToolbar)({
  width: "100%",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  backgroundColor: "#26de81",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: "8px",
    p: "8px",
    pb: 0,
  },
});

export default function AppNavbar() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const routing = [
    "/dashboard",
    "/bank_accounts",
    "/create_virements",
    "/create_transactions",
    "/profil",
  ];
  const icons = [
    <DashboardIcon />,
    <AccountBalanceIcon />,
    <ReceiptLongIcon />,
    <PaidIcon />,
    <Person2Icon/>
  ];
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginBottom: "100px",
        }}
      >
        <Toolbar>
          <img src={logo} className="h-15 w-20"></img>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 235, boxSizing: "border-box" },
        }}
      >
        {" "}
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              "Dashboard",
              "Bank Account",
              "Create Virements ",
              "Create Transactions",
              "Profil"
            ].map((text, index) => (
              <Link to={routing[index]}>
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={function(e) {sessionStorage.removeItem("token"), navigate("/")} }
          >
            Log Out
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export function CustomIcon() {
  return (
    <Box
      sx={{
        width: "1.5rem",
        height: "1.5rem",
        bgcolor: "black",
        borderRadius: "999px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundImage:
          "linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)",
        color: "hsla(210, 100%, 95%, 0.9)",
        border: "1px solid",
        borderColor: "hsl(210, 100%, 55%)",
        boxShadow: "inset 0 2px 5px rgba(255, 255, 255, 0.3)",
      }}
    >
      {/* <DashboardRoundedIcon color="inherit" sx={{ fontSize: '1rem' }} /> */}
    </Box>
  );
}
