import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width to prevent content from overflowing */}
        <div className="w-64 bg-white shadow-lg">
          <Sidebar />
        </div>

        {/* Main Content - Ensure it doesn't overflow */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            {user ? (
              <div>
                <p className="text-lg">Welcome, <span className="font-semibold">{user.name}</span>!</p>
                <p>Business: <span className="font-semibold">{user.businessName}</span></p>
                <p>Email: <span className="font-semibold">{user.email}</span></p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
