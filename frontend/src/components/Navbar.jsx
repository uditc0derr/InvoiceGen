import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Invoice Generator</h1>
        <div>
          <Link to="/dashboard" className="mx-2">Dashboard</Link>
          <Link to="/invoices" className="mx-2">Invoices</Link>
      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
