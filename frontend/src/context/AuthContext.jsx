import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for user authentication
const UserContext = createContext();

// AuthContext component to provide auth-related state
function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user token exists in localStorage on initial load
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:4500/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming token should be in the Authorization header
            },
          });
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null); // Token is invalid, so set user to null
          }
        } else {
          setUser(null); // No token in localStorage, set user to null
          setLoading(false)
        }
      } catch (error) {
        console.error(error);
        setUser(null); // If error occurs, set user to null
        
      } finally {
        setLoading(false); // Once the verification is done, stop loading
      }
    };
    verifyUser(); // Call the verifyUser function inside useEffect
  }, []); // Empty dependency array means this runs only once on component mount

  // Login function to set the user
  const login = (user) => {
    setUser(user);
    localStorage.setItem('token', user.token); // Store token in localStorage
  };

  // Logout function to clear user and token
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    // Optionally, you can navigate to the login page if needed
    // navigate('/login'); // Redirect to login page on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => useContext(UserContext);

export default AuthContext;
