import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <nav className="absolute top-0 left-0 w-full flex justify-between px-10 py-4 bg-opacity-20 backdrop-blur-lg shadow-md">
        <h1 className="text-2xl font-bold">📄 InvoiceGen</h1>
        <div>
          <button 
            onClick={() => navigate("/login")}
            className="px-6 py-2 mr-4 text-lg font-semibold bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            Login
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="px-6 py-2 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="text-center max-w-3xl">
        <h2 className="text-4xl font-bold leading-snug">Manage Your Invoices <span className="text-yellow-300">Easily</span> & <span className="text-green-300">Efficiently</span></h2>
        <p className="text-lg mt-4 text-gray-200">
          Create, manage, and send invoices with ease. Track your transactions and streamline your business finances with our powerful Invoice Management System.
        </p>

        <div className="mt-6">
          <button 
            onClick={() => navigate("/register")}
            className="px-8 py-3 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg shadow-md transition cursor-pointer"
          >
            Get Started 🚀
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-200 text-sm">
        © {new Date().getFullYear()} InvoiceGen. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
