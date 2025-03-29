import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./components/InvoiceDetail";
import CreateInvoice from "./components/CreateInvoice";
import LandingPage from "./pages/Landing";

const App = () => {
  
  return (
    <Router>
      
            <Routes>
            <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoice/:id" element={<InvoiceDetail />} />
              <Route path="/create" element={<CreateInvoice />} />

              
            </Routes>
          
       
    </Router>
  );
};

export default App;
