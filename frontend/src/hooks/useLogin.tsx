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
        `http://localhost:4000/api/users/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("API response status code:", response.status);
  
      if (response.status === 200) {
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
