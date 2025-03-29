import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <aside className="bg-gray-900 text-white w-64 h-screen fixed left-0 top-0 p-5 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul>
        <li className="mb-3">
          <Link to="/dashboard" className="hover:text-gray-300 block p-2">Dashboard</Link>
        </li>
        <li className="mb-3">
          <Link to="/invoices" className="hover:text-gray-300 block p-2">Invoices</Link>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer w-full transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
