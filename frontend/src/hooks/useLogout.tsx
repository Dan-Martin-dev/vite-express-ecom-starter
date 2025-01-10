import useAuth from "@/context/AuthContext";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const useLogout = () => {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage. Unable to log out.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/logout",
        {}, // No body for logout
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Clear token and update state
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        toast.success("Logout successful!");
        console.log("Logout successful");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response) {
        toast.error(
          `Logout failed: ${
            axiosError.response.data.message || "Unknown error"
          }`
        );
      } else {
        toast.error("An unexpected error occurred during logout.");
      }
    }
  };

  return { handleLogout };
};
  
export default useLogout;
