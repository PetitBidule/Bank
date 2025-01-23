import "./App.css";
import Register from "./view/auth/register.jsx";
import Login from "./view/auth/login.jsx";
import ViewBankAccounts from "./view/viewBankAccounts.jsx";
import ViewBankAccount from "./view/viewBankAccount.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Dashboard from './view/dashboard.jsx'
import CreateTransactions from './view/createTransactions.jsx'
import CreateVirements from './view/createVirements.jsx'

function App() {
  
  const isAuthenticated = sessionStorage.getItem("token");

  return (
    <BrowserRouter>
      {isAuthenticated !== null ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bank_accounts" element={<ViewBankAccounts />} />
          <Route
            path="/account/:id/transactions"
            element={<ViewBankAccount />}
          />
          <Route path="/bank_accounts" element={<ViewBankAccounts />} />
          <Route path="/account/:id/transactions" element={<ViewBankAccount />}/>
          <Route path="/create_transactions" element={<CreateTransactions />}/>
          <Route path="/create_virements" element={<CreateVirements />}/>
         <Route path="*" element={<h1>The Page doesn't exist, Mr. Kiwi</h1>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<h1>No, no, no</h1>} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
