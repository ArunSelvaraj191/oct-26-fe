import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./modules/Login";
import Register from "./modules/Register";
import Dashboard from "./modules/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  // console.log("Mithra")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
