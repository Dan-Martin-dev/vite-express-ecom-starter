import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UseLoginReturn } from "../../src/types/types.tsx";

// Validation function reused from the backend
const validateInputs = (name: string, email: string, password: string): string | null => {
  if (name.trim().length < 2 || name.trim().length > 50) {
    return "Name must be between 2 and 50 characters.";
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Name must only contain letters and spaces.";
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Invalid email format.";
  }
  if (password.length < 6 || !/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
    return "Password must be at least 6 characters long and include both letters and numbers.";
  }
  return null;
};

const useLogin = (): UseLoginReturn => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // React Router navigation hook

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!isClient) return;

    const validationError = validateInputs(name, email, password);


    if (validationError) {
      setError(validationError); // Display validation error
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/users/register`,
        { name, email, password }
      );

      if (response.status === 201) {
        toast.success("Felicitaciones! Tu usuario ha sido creado!");
        setTimeout(() => {
          navigate("/"); // Navigate to home page
        }, 3000);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response) {
        const { message } = axiosError.response.data;
        if (message === "User with this name already exists") {
          toast.error("Este nombre ya está en uso.", { position: "top-right" });
        } else if (message === "Email is already in use") {
          toast.error("Este email ya ha sido utilizado.", { position: "top-right" });
        } else {
          toast.error("Ha habido un error, intente nuevamente.", { position: "top-right" });
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.", { position: "top-right" });
      }
    }
  };

  return {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    isClient,
    handleSubmit,
    error,
  };
};

export default useLogin;
