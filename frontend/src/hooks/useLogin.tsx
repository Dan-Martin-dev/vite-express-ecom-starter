import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UseLoginReturn } from "../types/types.tsx";

const validateInputs = (email: string, password: string): string | null => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};

const useLogin = (): UseLoginReturn => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // For React

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);

  const navigate = useNavigate(); // React Router navigation hook

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    console.log("Form submitted!"); 
  
    console.log("EmailUU:", email);
    console.log("PasswordUUU:", password);
  
    const validationError = validateInputs(email, password);
    console.log("Validation resultUUU:", validationError);

    if (validationError) {
      toast.error(validationError, { position: "top-right" });
      return;
    }
  
    try {
      console.log("Sending API request...");
      const response = await axios.post(
        `${API_BASE_URL}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("API response status code:", response.status);
  
      if (response.status === 200) {
        const { token } = response.data; // Ensure API returns token

        if (token) {
          localStorage.setItem("token", token); // Save token to localStorage
          toast.success("Congratulations! Your user has been created");
        } else {
          toast.error("No token received. Please try logging in.");
        }
        toast.success("Login successful");
        setTimeout(() => {
          console.log("Navigating to home page...");
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  
  return {
    email,
    setEmail,
    password,
    setPassword,
    isClient,
    setIsClient,
    handleSubmit,
  };
};

export default useLogin;
