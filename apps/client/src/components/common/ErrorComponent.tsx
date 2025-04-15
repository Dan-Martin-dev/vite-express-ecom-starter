import React from "react";

interface ErrorComponentProps {
  message?: string; // Optional 'message' prop
  error?: any; // Optional 'error' prop
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message, error }) => (
  <div className="text-red-500">
    {message || `Error: ${error}`}
  </div>
);

export default ErrorComponent;