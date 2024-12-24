import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/forgot-password", { email });
      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setEmail("");
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow" >
      <h2 className="text-2xl mb-4 font-bold">Forgot Password</h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label htmlFor="email"  className="block mb-2 font-bold">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email Id"
            className="border w-full p-2 mb-4 rounded"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <button type="submit" className="w-full bg-blue-500 text-white rounded font-serif p-2 text-xl">Send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;