import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check token on mount
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkAuth); // Listen for token changes
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    navigate('/'); 
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        <div className="text-2xl font-semibold cursor-pointer" onClick={() => navigate('/')}>
          My App
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
            >
              Log Out
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 mr-4"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-700"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
