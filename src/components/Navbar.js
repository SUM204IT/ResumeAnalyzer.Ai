import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logoutHandler(){
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  }
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">
        ResumeAI
      </h1>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

        <Link to="/home" className="hover:text-blue-600 transition">
        Home
        </Link>
        
        <Link to="/features" className="hover:text-blue-600 transition">
        Features
        </Link>

        <Link to="/pricing" className="hover:text-blue-600 transition">
        Pricing
        </Link>

        <Link to="/blog" className="hover:text-blue-600 transition">
        Blog
        </Link>
        
      </div>

      {/* Button */}
      {
        isAuthenticated ? (
          <div className="flex flex-row gap-5">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition">
        <Link to="/pricing">Get Started</Link>
      </button>
      <button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={logoutHandler}>
        Logout
      </button>
          </div>
        ) : 
        (<button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition">
        <Link to="/login">Login</Link>
      </button>)
      }
    </nav>
  );
}