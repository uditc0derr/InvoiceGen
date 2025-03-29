import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("https://invoicegen-backend.onrender.com/api/invoice/all", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setInvoices(response.data);
        setFilteredInvoices(response.data);
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter((invoice) =>
        invoice.customerName?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredInvoices(filtered);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-6 ml-64">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Invoices</h2>
              <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create Invoice
              </Link>
            </div>

            <input
              type="text"
              placeholder="Search by Customer Name"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 mb-4 border rounded"
            />

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Invoice ID</th>
                    <th className="border p-2">Customer</th>
                    <th className="border p-2">Total (₹)</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice) => (
                      <tr key={invoice._id}>
                        <td className="border p-2">{invoice._id}</td>
                        <td className="border p-2">{invoice.customerName}</td>
                        <td className="border p-2 font-bold text-green-600">₹{invoice.totalAmount}</td>
                        <td className="border p-2">
                          <Link to={`/invoice/${invoice._id}`} className="text-blue-500">View</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4">No invoices found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
