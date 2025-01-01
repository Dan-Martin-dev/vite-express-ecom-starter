import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UseLoginReturn } from '../../src/types/types.tsx'


const useLogin = (): UseLoginReturn => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null); // Name error state

  const navigate = useNavigate(); // React Router navigation hook
 
  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateName = (name: string): string | null => {
    if (name.trim().length < 2 || name.trim().length > 50) {
      return "Name must be between 2 and 50 characters.";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Name must only contain letters and spaces.";
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!isClient) return;

    const nameValidationError = validateName(name);
      if (nameValidationError) {
        setNameError(nameValidationError); // Set the error
        return;
      }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, { name, email, password });

      if (response.status === 201) {
        toast.success("Felicitaciones! Tu usuario ha sido creado!");
        setTimeout(() => {
            navigate("/"); // Navigate to home page
        }, 3000);
      }
    } 
    catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response) {
        if (
          axiosError.response.status === 400 &&
          axiosError.response.data.message === "Email is not available"
        ) {
          toast.error("Este email ya ha sido utilizado", {
            position: "top-right",
          });
        } else {
          toast.error("Ha habido un error, intente nuevamente", {
            position: "top-right",
          });
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
        });
      }
    }
  };

  return { email, setEmail, name, setName, password, setPassword, isClient, handleSubmit, nameError };
};

export default useLogin;
