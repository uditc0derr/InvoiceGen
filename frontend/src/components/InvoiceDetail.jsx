import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const printRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://invoicegen-backend.onrender.com/api/invoice/id/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setInvoice(response.data);
      } catch (err) {
        setError("Error fetching invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };
  const handleSendEmail = async () => {
    if (!invoice) return;
  
    try {
      setSending(true);
      setEmailStatus("Sending Email...");
  
      const token = localStorage.getItem("token");
      const formattedDate = new Date(invoice.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const totalSum = invoice.products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);
  
      const invoiceDetailsHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #333;">🧾 Invoice Details</h2>
          
          <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p><strong>Invoice ID:</strong> ${invoice._id}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Customer Name:</strong> ${invoice.customerName}</p>
            <p><strong>Email:</strong> ${invoice.customerEmail}</p>
            <p><strong>Total Amount:</strong> <span style="color: green; font-weight: bold;">₹${invoice.totalAmount}</span></p>
          </div>
  
          <h3 style="color: #333; margin-top: 20px;">📦 Products</h3>
          <table style="width: 100%; border-collapse: collapse; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: 1px solid #ddd;">
            <thead>
              <tr style="background-color: #007bff; color: white; border-bottom: 2px solid #ddd;">
                <th style="padding: 10px; text-align: left; border-right: 1px solid #ddd;">Product</th>
                <th style="padding: 10px; text-align: right; border-right: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; text-align: right; border-right: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.products.map(product => `
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 10px; border-right: 1px solid #ddd;">${product.name}</td>
                  <td style="padding: 10px; text-align: right; border-right: 1px solid #ddd;">₹${product.price.toFixed(2)}</td>
                  <td style="padding: 10px; text-align: right; border-right: 1px solid #ddd;">${product.quantity}</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold;">₹${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
  
          <div style="text-align: right; margin-top: 15px; font-size: 18px; font-weight: bold; color: #007bff; border-top: 2px solid #ddd; padding-top: 10px;">
            Total Sum: ₹${totalSum}
          </div>
  
          <p style="margin-top: 20px; text-align: center; color: #555;">Thank you for Shopping 😊</p>
        </div>
      `;
  
      await axios.post(
        "https://invoicegen-backend.onrender.com/api/send-email",
        {
          to: invoice.customerEmail,
          subject: `Invoice #${invoice._id}`,
          html: invoiceDetailsHtml,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
  
      setEmailStatus("Email Sent Successfully! ✅");
    } catch (error) {
      setEmailStatus("Error sending email. ❌");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading invoice...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const totalSum = invoice.products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border ml-[26%]">
          <div ref={printRef}>
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Invoice Details</h2>

            <div className="border rounded-lg p-4 bg-gray-100 mb-6">
              <p className="text-gray-700"><strong>Invoice ID:</strong> {invoice._id}</p>
              <p className="text-gray-700"><strong>Customer Name:</strong> {invoice.customerName}</p>
              <p className="text-gray-700"><strong>Customer Email:</strong> {invoice.customerEmail}</p>
              <p className="text-gray-700"><strong>Total Amount:</strong> <span className="text-green-600 font-semibold">₹{invoice.totalAmount}</span></p>
            </div>

            <h3 className="text-xl font-semibold mb-4">Products</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 border">Product</th>
                    <th className="py-2 px-4 border">Price</th>
                    <th className="py-2 px-4 border">Quantity</th>
                    <th className="py-2 px-4 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.products.map((product, index) => (
                    <tr key={index} className="text-gray-700">
                      <td className="py-2 px-4 border">{product.name}</td>
                      <td className="py-2 px-4 border">₹{product.price}</td>
                      <td className="py-2 px-4 border">{product.quantity}</td>
                      <td className="py-2 px-4 border">₹{(product.price * product.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan="3" className="py-2 px-4 border text-right">Total Sum:</td>
                    <td className="py-2 px-4 border">₹{totalSum}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {emailStatus && (
            <div className={`text-center text-sm font-semibold mt-4 ${emailStatus.includes("Error") ? "text-red-500" : "text-green-600"}`}>
              {emailStatus}
            </div>
          )}

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 cursor-pointer transition"
            >
              Print Invoice 🖨️
            </button>

            <button
              onClick={handleSendEmail}
              disabled={sending}
              className={`px-5 py-2 rounded-lg shadow-md text-white transition cursor-pointer ${
                sending ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {sending ? "Sending..." : "Send Email ✉️"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
