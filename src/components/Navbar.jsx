import { useState } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../assets/main-logo.jpg"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0F172A] text-white p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          <img src={mainLogo} alt="Main Logo" className="w-12 h-12 object-contain" />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition">Movies</Link>
          <Link to="/" className="hover:text-blue-400 transition">TV Shows</Link>
          <Link to="/" className="hover:text-blue-400 transition">Suggest Me</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none">
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-[#1E293B] p-4">
          <Link to="/" className="block hover:text-blue-400 transition">Movies</Link>
          <Link to="" className="block hover:text-blue-400 transition">TV Shows</Link>
          <Link to="" className="block hover:text-blue-400 transition">Suggest Me</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
