// src/components/Navbar.jsx
import { Home, LogIn, LogOut, UserPlus } from "lucide-react";
import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("authToken");
   
    setToken(null);
    
    navigate('/login');
  };

  
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authToken"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex space-x-4">
            <Link to={"/"}>
              <button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
                <Home className="mr-2 h-4 w-4" />
                Home
              </button>
            </Link>
            
            
          </div>
          <div className="flex items-center space-x-4">
            {token ? (
             
              <button 
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link to={"/login"}>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </button>
                </Link>
                
                <Link to={"/signup"}>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </button>
                </Link>
                
              </div>
              
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;