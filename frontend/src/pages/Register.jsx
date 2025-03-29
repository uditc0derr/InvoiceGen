import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      
      localStorage.setItem("token", response.data.token);
      
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          Already have an account?  
          <Link to="/login" className="text-blue-600 font-semibold hover:underline cursor-pointer"> Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
