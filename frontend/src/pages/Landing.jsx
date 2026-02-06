import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-8 py-4 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-2xl font-semibold text-indigo-600">
          InvoiceGen
        </h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold leading-tight text-slate-900">
              Simple invoicing for  
              <span className="text-indigo-600"> modern businesses</span>
            </h2>

            <p className="mt-4 text-slate-600 text-lg">
              Create professional invoices, track payments, and manage
              your finances — all from one clean dashboard.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-7 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition shadow"
              >
                Get started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-7 py-3 border border-slate-300 text-slate-700 font-medium rounded-md hover:border-indigo-600 hover:text-indigo-600 transition"
              >
                View demo
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Why InvoiceGen?
            </h3>

            <ul className="space-y-3 text-slate-600">
              <li>✔ Create invoices in seconds</li>
              <li>✔ Track payments & due dates</li>
              <li>✔ Download & share PDFs</li>
              <li>✔ Secure & cloud-based</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} InvoiceGen. Built for growing businesses.
      </footer>
    </div>
  );
};

export default LandingPage;
