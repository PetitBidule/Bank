import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './view/auth/register.jsx'
import Login from './view/auth/login.jsx'
import ViewBankAccounts from './view/viewBankAccounts.jsx'
import ViewBankAccount from './view/viewBankAccount.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
  

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bank_accounts" element={<ViewBankAccounts />} />
      <Route path="/account/:id/transactions" element={<ViewBankAccount />} />
    </Routes>
  </BrowserRouter>
)
