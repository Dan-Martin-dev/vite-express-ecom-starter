import React from 'react'
import useAuth from '@/context/AuthContext';

const useLogout = () => {
    const { setIsAuthenticated } = useAuth();
    
    const handleLogout = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/login`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
              "Content-Type": "application/json",
            },
          });
    
          if (response.ok) {
            // Clear token and update state
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            console.log("Logout successful");
          } else {
            const errorData = await response.json();
            console.error("Logout failed:", errorData.message);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
    
  return {
    handleLogout
  }
}

export default useLogout