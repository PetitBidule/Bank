import "./App.css";
import Register from "./view/auth/register.jsx";
import Login from "./view/auth/login.jsx";
import ViewBankAccounts from "./view/viewBankAccounts.jsx";
import ViewBankAccount from "./view/viewBankAccount.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Dashboard from "./view/dashboard.jsx";
import CreateTransactions from "./view/createTransactions.jsx";
import CreateVirements from "./view/createVirements.jsx";
import PrivateRoute from "./component/PrivateRoute";
import Profil from "./view/Profil.jsx";
import { useState, } from "react";

function App() {

  const [isAuthenticated, setAuthenticated] = useState("");
  useEffect(() => {
    setAuthenticated(sessionStorage.getItem("token"))
  }, [isAuthenticated])
  

  return (
    <BrowserRouter>
      {isAuthenticated == null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>No, no, no</h1>} />
        </Routes>
      ) : null }
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/bank_accounts"
          element={
            <PrivateRoute>
              <ViewBankAccounts />
            </PrivateRoute>
          }
        />
        <Route
          path="/account/:id/transactions"
          element={
            <PrivateRoute>
              <ViewBankAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/create_transactions"
          element={
            <PrivateRoute>
              <CreateTransactions />
            </PrivateRoute>
          }
        />
        <Route
          path="/create_virements"
          element={
            <PrivateRoute>
              <CreateVirements />
            </PrivateRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>The Page doesn't exist, Mr. Kiwi</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
