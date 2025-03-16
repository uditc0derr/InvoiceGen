import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const CreateInvoice = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [products, setProducts] = useState([{ name: "", quantity: 1, price: "" }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [invoiceCreated, setInvoiceCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newTotal = products.reduce((sum, product) => {
      return sum + (parseFloat(product.price) || 0) * (parseInt(product.quantity) || 0);
    }, 0);
    setTotalAmount(newTotal.toFixed(2));
  }, [products]);

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: 1, price: "" }]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const invoiceData = {
      customerName,
      customerEmail,
      products,
      totalAmount,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/invoice/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(invoiceData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setInvoiceCreated(true);

        setTimeout(() => {
          navigate(`/invoice/${data._id}`, { state: { invoice: data } });
        }, 2000);
      } else {
        alert("Error creating invoice: " + data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex justify-center items-start mt-8 ml-[20%]">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">📝 Create Invoice</h2>

            {invoiceCreated && (
              <div className="bg-green-500 text-white p-3 rounded mb-4 text-center font-semibold">
                ✅ Invoice successfully created! Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Customer Name */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Customer Email */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Customer Email</label>
                <input
                  type="email"
                  placeholder="Enter customer email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Products */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Products</label>
                {products.map((product, index) => (
                  <div key={index} className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, "name", e.target.value)}
                      className="w-1/3 p-2 border rounded-md"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, "quantity", parseInt(e.target.value))}
                      className="w-1/4 p-2 border rounded-md"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={product.price}
                      onChange={(e) => handleProductChange(index, "price", parseFloat(e.target.value))}
                      className="w-1/3 p-2 border rounded-md"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="bg-red-500 text-white px-3 rounded-md hover:bg-red-600 cursor-pointer"
                    >
                      ✖
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addProduct}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition"
                >
                  ➕ Add Product
                </button>
              </div>

              {/* Total Amount */}
              <div className="mb-4">
                <label className="block font-medium text-gray-700">Total Amount (₹)</label>
                <input
                  type="text"
                  value={totalAmount}
                  readOnly
                  className="w-full p-3 border rounded-md bg-gray-100 font-semibold text-lg"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-md text-white font-medium cursor-pointer ${
                  loading ? "bg-green-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                } transition`}
                disabled={loading}
              >
                {loading ? "Generating Invoice..." : "Generate Invoice"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
