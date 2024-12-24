import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/auth/reset-password/${id}/${token}`, {
        password,
      });

      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response.data.message || "An error occurred";
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setPassword("");
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 shadow"
      >
        <h2 className="text-2xl mb-4 font-bold">Reset Password</h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p className="relative">
          <label htmlFor="password" className="block mb-2 font-semibold">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="border w-full p-2 mb-4 rounded"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-8 right-0 p-2 mb-4 font-serif rounded"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </p>
        <br></br>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded font-serif p-2 text-xl"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;