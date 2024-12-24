import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  
  const isAdmin = localStorage.getItem("role") === "admin";  
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to={"/"} className="text-xl font-bold">
          Online Assessment
        </Link>
        <div>
          {isAuthenticated ? (
            <>
              {isAdmin && (    
                <Link to={"/adminpanel"} className="mr-4">Admin</Link>             
              )}              
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>      
              <Link to={"/login"} className="mr-4">Login</Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}             
        </div>
      </div>
    </nav>
  );
};

export default Navbar;