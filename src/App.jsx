import { useState } from "react";
import "./App.css";
import Register from "./view/auth/register.jsx";
import Login from "./view/auth/login.jsx";
import Home from "./view/home.jsx";
import { BrowserRouter, Routes, Route } from "react-router";


function App() {
  const isAuthenticated = sessionStorage.getItem("token");
  console.log(isAuthenticated);
  
  return (
    <BrowserRouter>
      {isAuthenticated !== null ? (
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="*" element={<h1>La Page n'existe pas sale kiwi</h1>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<h1>Non non non</h1>} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
